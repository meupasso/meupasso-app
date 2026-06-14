import fs from "fs";

const file = "content/guias/python/glossario.mdx";
let content = fs.readFileSync(file, "utf-8");

const extras = `

**None**
Valor especial que representa "nenhum valor" ou "vazio". Diferente de zero ou string vazia.
\`\`\`python
resultado = None
if resultado is None:
    print("Sem resultado ainda")
\`\`\`

**range()**
Função que gera uma sequência de números. Muito usada com o for.
\`\`\`python
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)
for i in range(1, 6):   # 1, 2, 3, 4, 5
    print(i)
\`\`\`

**type()**
Função que retorna o tipo de um dado.
\`\`\`python
print(type(42))       # <class 'int'>
print(type("texto"))  # <class 'str'>
print(type(True))     # <class 'bool'>
\`\`\`
`;

// Insert after **Método** section (before **Objeto**)
content = content.replace("**Método**", "**Método**" + extras);
fs.writeFileSync(file, content, "utf-8");
console.log("✅ glossario.mdx");
