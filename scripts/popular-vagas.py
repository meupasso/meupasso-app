import json, urllib.request, time, re

# === STEP 1: Fetch GitHub Issues ===
print("=== 1. Buscando vagas do GitHub ===")

repos = [
    "backend-br/vagas",
    "frontendbr/vagas",
    "soujava/vagas"
]

all_gh = []
for repo in repos:
    url = f"https://api.github.com/repos/{repo}/issues?state=open&per_page=30&sort=created&direction=desc"
    try:
        r = urllib.request.Request(url, headers={"Accept": "application/vnd.github.v3+json", "User-Agent": "MeuPasso/1.0"})
        with urllib.request.urlopen(r, timeout=15) as resp:
            items = json.loads(resp.read())
            all_gh.extend(items)
            print(f"  {repo}: {len(items)} vagas")
    except Exception as e:
        print(f"  {repo}: ERRO - {e}")

print(f"  Total GitHub: {len(all_gh)}")

# === STEP 2: Fetch Remotive ===
print()
print("=== 2. Buscando Remotive ===")
try:
    r = urllib.request.Request("https://remotive.com/api/remote-jobs?category=software-dev&limit=20")
    with urllib.request.urlopen(r, timeout=15) as resp:
        remotive_data = json.loads(resp.read())
    remotive_jobs = remotive_data.get("jobs", [])
    print(f"  Remotive: {len(remotive_jobs)} vagas")
except Exception as e:
    print(f"  Remotive: ERRO - {e}")
    remotive_jobs = []

# === STEP 3: Process ===
print()
print("=== 3. Processando dados ===")

def process_gh(items):
    result = []
    for v in items:
        if v.get("pull_request"):
            continue
        texto = (v.get("title","") + " " + v.get("body","")).lower()
        labels = " ".join([(l.get("name","") if isinstance(l, dict) else str(l)) for l in v.get("labels",[])]).lower()
        full_text = texto + " " + labels

        cidade = "Brasil"
        remoto = False
        loc_match = re.match(r'^\[(.+?)\]', v.get("title",""))
        if loc_match:
            loc = loc_match.group(1)
            if loc.lower() in ("remoto", "remote", "home office"):
                cidade = "Remoto"
                remoto = True
            else:
                cidade = loc

        # Ignorar vagas sênior/pleno
        if any(k in full_text for k in ["sênior", "senior", "sr.", " sr ", "pleno", " pl."]):
            continue

        tipo = "nao-especificado"
        if any(k in full_text for k in ["junior", "júnior", " jr ", " jr"]): tipo = "junior"
        if any(k in full_text for k in ["estagio", "estágio"]): tipo = "estagio"
        if "trainee" in full_text: tipo = "trainee"

        # Extrair empresa do título
        titulo = v.get("title", "")
        empresa_match = re.search(r'\b(?:na|em|para)\s+@?([A-Za-z0-9À-ÿ\-_.]+)', titulo)
        if not empresa_match:
            empresa_match = re.search(r'-\s*([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9\-_.]+)$', titulo)
        if not empresa_match:
            empresa_match = re.search(r'@([A-Za-zÀ-ÿ0-9\-_.]+)', titulo)
        empresa = empresa_match.group(1).strip("@- ") if empresa_match else "Empresa não informada"

        techs = []
        if "python" in full_text: techs.append("Python")
        if "javascript" in full_text or " js " in full_text: techs.append("JavaScript")
        if "java" in full_text and "javascript" not in full_text: techs.append("Java")
        if "react" in full_text: techs.append("React")
        if "node" in full_text: techs.append("Node.js")
        if "typescript" in full_text: techs.append("TypeScript")
        if "php" in full_text: techs.append("PHP")

        result.append({
            "titulo": v.get("title", "Vaga de Desenvolvedor"),
            "empresa": empresa,
            "cidade": cidade,
            "remoto": remoto,
            "tipo": tipo,
            "tecnologias": techs,
            "descricao": (v.get("body", "") or "")[:500],
            "url": v.get("html_url", "#"),
            "fonte": "github-issues",
            "publicada_em": v.get("created_at", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
        })
    return result


def process_remotive(jobs):
    result = []
    for j in jobs:
        texto = (j.get("title", "") + " " + (j.get("description", "") or "")).lower()

        techs = []
        if "python" in texto: techs.append("Python")
        if "javascript" in texto or " js " in texto: techs.append("JavaScript")
        if "java" in texto and "javascript" not in texto: techs.append("Java")
        if "react" in texto: techs.append("React")
        if "node" in texto: techs.append("Node.js")
        if "typescript" in texto: techs.append("TypeScript")
        if "php" in texto: techs.append("PHP")

        tipo = "pleno"
        if any(k in texto for k in ["junior", "júnior", "jr ", "entry"]): tipo = "junior"
        if any(k in texto for k in ["estagio", "estágio", "intern"]): tipo = "estagio"
        if "trainee" in texto: tipo = "trainee"

        result.append({
            "titulo": j.get("title", "Vaga de Desenvolvedor"),
            "empresa": j.get("company_name", "Empresa"),
            "cidade": j.get("candidate_required_location", "Remoto"),
            "remoto": True,
            "tipo": tipo,
            "tecnologias": techs,
            "descricao": (j.get("description", "") or "")[:500],
            "url": j.get("url", "#"),
            "fonte": "remotive",
            "publicada_em": j.get("publication_date", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
        })
    return result


todas = process_gh(all_gh) + process_remotive(remotive_jobs)
print(f"  Total bruto: {len(todas)}")

KEYWORDS_NIVEL = ["junior", "júnior", "jr", "estagio", "estágio", "trainee", "iniciante", "entry"]
KEYWORDS_TECH = ["python", "javascript", "java", "react", "node", "typescript", "php"]

filtradas = []
for v in todas:
    texto = (v["titulo"] + " " + v["descricao"] + " " + " ".join(v["tecnologias"])).lower()
    if any(k in texto for k in KEYWORDS_NIVEL) or any(k in texto for k in KEYWORDS_TECH):
        filtradas.append(v)

# Dedup por URL
vistas = set()
filtradas_dedup = []
for v in filtradas:
    if v["url"] not in vistas:
        vistas.add(v["url"])
        filtradas_dedup.append(v)
filtradas = filtradas_dedup[:50]
print(f"  Após filtro e dedup: {len(filtradas)} vagas")

for v in filtradas[:5]:
    techs_str = ",".join(v["tecnologias"])
    print(f"  - {v['titulo'][:70]} | {v['empresa'][:20]} | {v['cidade'][:15]} | {v['tipo']} | {techs_str}")

# === STEP 4: Insert into Supabase ===
print()
print("=== 4. Inserindo no Supabase ===")

SUPABASE_URL = "https://xjyvwxcqrywnnkbrngku.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqeXZ3eGNxcnl3bm5rYnJuZ2t1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUxMzY5NSwiZXhwIjoyMDk2MDg5Njk1fQ.bNckI8YuLZVaSkg2jUiZiDhk-noyJxEP3avCvBD9lPU"

supabase_headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

inserted = 0
errors = 0
for vaga in filtradas:
    try:
        body = json.dumps(vaga).encode()
        r = urllib.request.Request(
            f"{SUPABASE_URL}/rest/v1/vagas",
            data=body,
            headers=supabase_headers,
            method="POST"
        )
        with urllib.request.urlopen(r, timeout=10) as resp:
            inserted += 1
    except urllib.error.HTTPError as e:
        errors += 1
        if errors <= 3:
            err_body = e.read().decode()
            print(f"  Erro {e.code}: {err_body[:200]}")

print(f"  Inseridas: {inserted}")
print(f"  Erros: {errors}")

# === STEP 5: Verify ===
print()
print("=== 5. Verificando tabela ===")
try:
    r = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/vagas?select=id,titulo,empresa,cidade,tipo,tecnologias&order=publicada_em.desc.nullslast&limit=10",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    )
    with urllib.request.urlopen(r) as resp:
        vagas_db = json.loads(resp.read())
        print(f"  Total na tabela: {len(vagas_db)}")
        print()
        if vagas_db:
            print("  Vagas inseridas:")
            for v in vagas_db:
                techs = ",".join(v.get("tecnologias", []))
                remoto_icon = "🏠" if v.get("remoto") else "📍"
                print(f"  • {v['titulo'][:70]}")
                print(f"    {v['empresa']} | {remoto_icon} {v['cidade']} | {v['tipo']} | {techs}")
                print()
except Exception as e:
    print(f"  Erro ao verificar: {e}")
