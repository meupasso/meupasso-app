- Programação Estruturada — Início
    
    <aside>
    1️⃣
    
    Exercícios de Fixação — Sintaxe
    
    </aside>
    
    - Exercícios Básicos
        - [PYB001] Crie um programa que peça o nome do usuário e exiba uma saudação personalizada:
        "Olá, [nome do usuário]! Bem-vindo ao nosso programa!"
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            nome = input("Digite seu nome:")
            
            print(f"Olá, {nome}! Bem-vindo ao nosso programa!")
            ```
            
        - [PYB002] Crie um programa que peça o preço de dois produtos e calcule o valor total da compra.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            produto_1 = float(input("Digite o preço do primeiro produto: ")
            produto_2 = float(input("DIgite o preço do segundo produto: ")
            
            total = (produto_1 + produto_2) / 2
            
            print(f"O valor total da compra foi de R$ {total:.2f}")
            ```
            
        - [PYB003] Crie um programa que peça a distância percorrida por um carro (em km) e o tempo gasto (em horas), e calcule sua velocidade média em m/s.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            distancia_km = float(input("Digite a distância percorrida em km: "))
            tempo_horas = float(input("Digite o tempo gasto em horas: "))
            
            distancia_metros = distancia_km * 1000
            tempo_minutos = tempo_horas * 3600
            
            velocidade_media = distancia_metros / tempo_segundos
            
            print(f"A velocidade média foi de {velocidade_media:.2f} m/s")
            
            ```
            
        - [PYB004] Crie um programa que peça o número de horas trabalhadas por um funcionário e o valor da hora de trabalho para calcular seu salário bruto.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            horas = int(input("Digite a quantidade de horas trabalhadas"))
            valor_hora = float(input("Digite o valor da hora trabalhada"))
            
            salario_bruto = horas * valor_hora
            
            print(f"O salário bruto é de R$ {salario_bruto:.2f")
            
            ```
            
        - [PYB005] Crie um programa que peça o valor de um empréstimo, a taxa de juros mensal e o número de meses para calcular o valor da parcela mensal.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            valor_emprestimo = float(input("Digite o valor total do empréstimo:")
            taxa_juros = float(input("Digite a taxa de juros mensal (em %)"))
            qtd_meses = int(input("Digite a quantidade de meses"))
            
            valor_total = valor_emprestimo + (valor_emprestimo * (taxa_juros / 100) * qtd_meses)
            
            valor_parcela = valor_total / qtd_meses
            
            print(f"Valor da parcela mensal: R$ {parcela_mensal:.2f}")
            
            ```
            
        - [PYB006] Crie um programa que peça  o consumo mensal de água de uma residência (em litros) e calcule o valor da conta, considerando que cada litro custa R$ 0,02.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            consumo_mensal = float(input("Informe o consumo mensal de água (em litros): "))
            
            valor_total = consumo_mensal * 0.02
            
            print(f"O valor da conta é R$ {valor_total:.2f}")
            ```
            
        - [PYB007] Crie um programa que peça o peso de uma encomenda (em kg) e calcule o valor do frete, considerando R$ 5,00 por kg.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            peso_encomenda = float(input("Digite o peso da encomenda (em kg): "))
            frete = peso_encomenda * 5.0
            
            print(f"O valor do frete é de R$ {frete:.2f}")
             
            ```
            
        - [PYB008] Crie um programa que receba a cotação do dólar e um valor em reais para converter o montante em dólares.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            valor_reais = float(input("Digite o valor em reais:"))
            valor_dolar = valor_reais / 5.62 # considerando o valor do dólar em maio de 2025
            
            print(f"Na cotação atual, cada dólar vale R$ 5,62. O valor em dólar é US$ {valor_dolar:.2f}")
            ```
            
        - [PYB009] Crie um programa que receba a altura e largura de uma parede (em metros), calcule sua área e determine a quantidade de tinta necessária para pintá-la, considerando que cada litro cobre 2m².
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            altura = float(input("Digite a altura da parede (em metros)": ))
            largura = float(input("Digite a largura da parede (em metros)": ))
            
            area = altura * largura
            
            tinta_necessaria = area / 2
            
            print(f"A área da parede é {area:.2f} metros quadrados.")
            print(f"Você precisará de {tinta_necessaria:.2f} litros de tinta para pintar a parede.")
            ```
            
        - [PYB010] Crie um programa que receba o preço à vista de um produto e o número de parcelas para calcular o valor de cada prestação, considerando juros simples de 2% ao mês.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            preco_a_vista = float(input("Digite o preço à vista do produto: "))
            num_parcelas = int(input("Digite o número de parcelas: "))
            
            taxa_juros = 0.02  # 2% ao mês
            
            # calcula o valor total com juros simples
            valor_total = preco_a_vista * (1 + taxa_juros * num_parcelas)
            
            # calcula o valor de cada parcela
            valor_parcela = valor_total / num_parcelas
            
            print(f"Valor total com juros: R$ {valor_total:.2f}")
            print(f"Valor de cada parcela: R$ {valor_parcela:.2f}")
            ```
            
    - Exercícios Intermediários
        - Controle de Fluxo
            - [PYI001] Escreva um programa que peça ao usuário que digite um número inteiro e diga se ele é par ou ímpar.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                numero = int(input("digite um número: ")
                
                if numero % 2 == 0:
                	print(f"{numero} é par")
                else:
                	print(f"{numero} é ímpar")
                ```
                
            - [PYI002] Escreva um programa que peça dois números inteiros ao usuário e diga qual é o maior, o menor ou se são iguais.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                numero_1 = int(input("digite o primeiro número: ")
                numero_2 = int(input("digite o segundo número: ")
                
                if numero_1 > numero_2:
                	print(f"{numero_1} é maior que {numero_2}.")
                elif numero_1 < numero_2:
                	print(f"{numero_2} é maior que {numero_1}.")
                else:
                	print("Os dois números são iguais")
                ```
                
            - [PYI003] Faça um programa que receba três notas de um aluno, calcule a média e escreva se o aluno está aprovado (média ≥ 7), reprovado (média < 4) ou em prova final (média entre 4 e 7).
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                nota1 = float(input("Digite a primeira nota: "))
                nota2 = float(input("Digite a segunda nota: "))
                nota3 = float(input("Digite a terceira nota: "))
                
                media = (nota1 + nota2 + nota3) / 3
                
                print(f"Média: {media:.2f}")
                
                if media >= 7:
                    print("Aluno aprovado!")
                elif media < 4:
                    print("Aluno reprovado!")
                else:
                    print("Aluno em prova final!")
                
                ```
                
            - [PYI004] Escreva um programa que receba a idade de uma pessoa e diga se ela pode votar ou não, considerando as regras brasileiras para voto obrigatório e facultativo.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                idade = int(input("Digite sua idade: "))
                
                if idade < 16:
                	print("O voto é proibido abaixo dos 16 anos.")
                elif 16 <= idade < 18 or idade >= 70:
                	print("O voto é facultativo entre 16 e 18 anos e acima de 70 anos")
                else:
                	print("O voto é obrigatório entre os 18 e os 70 anos.")
                ```
                
            - [PYI005] Escreva um programa que receba o número do mês (1 a 12) e diga quantos dias ele tem (considerando ano não bissexto).
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                mes = int(input("Digite o número do mês (1 a 12): "))
                
                if mes == 1 or mes == 3 or mes == 5 or mes == 7 or mes == 8 or mes == 10 or mes == 12:
                    print("31 dias")
                elif mes == 2:
                    print("28 dias")
                elif mes == 4 or mes == 6 or mes == 9 or mes == 11:
                    print("30 dias")
                else:
                    print("Mês inválido")
                
                ## usando match-case
                mes = int(input("Digite o número do mês (1 a 12): ")
                
                match(mes):
                    case 1 | 3 | 5 | 7 | 8 | 10 | 12:
                        print("31 dias")
                    case 2:
                        print("28 dias")
                    case 4, 5, 6, 9, 11:
                        print("30 dias")
                    case _:
                        print("Mês inválido")
                
                ```
                
            - [PYI006] Escreva um programa que receba uma letra do alfabeto e diga se é vogal ou consoante.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                letra = input("Digite uma letra: ")
                
                match(letra.lower()):
                    case "a" | "e" | "i" | "o" | "u":
                        print("vogal")
                    case _:
                        print("consoante")
                ```
                
            - [PYI007] Escreva um programa que receba dois números inteiros e um operador aritmético (+, -, *, /), execute a operação e mostre o resultado. Se o operador for inválido, exiba mensagem de erro.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                valor1 = int(input("digite o primeiro valor: "))
                valor2 = int(input("digite o segundo valor: "))
                
                operacao = input("digite o operador (+, -, *, /): ")
                
                if operacao == "+":
                    print(f"Soma: {valor1 + valor2}")
                elif operacao == "-":
                    print(f"Subtração: {valor1 - valor2}")
                elif operacao == "*":
                    print(f"Multiplicação: {valor1 * valor2}")
                elif operacao == "/":
                    print(f"Divisão: {valor1 / valor2}")
                else:
                    print("operação inválida!")
                ```
                
            - [PYI009] Escreva um programa que receba o preço de um produto e a forma de pagamento (1 - à vista, 2 - cartão de crédito, 3 - cartão de débito) e calcule o valor final considerando 10% de desconto para pagamento à vista ou no débito.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                preco = input("digite o valor do produto: ")
                
                preco = float(preco)
                
                forma_pagamento = input(
                    "Escolha a forma de pagamento:\n"
                    "1 - à vista\n"
                    "2 - cartão de crédito\n"
                    "3 - cartão de débito\n"
                )
                
                forma_pagamento = int(forma_pagamento)
                
                if forma_pagamento == 1 or forma_pagamento == 3:
                    total = preco * 0.9
                    print("Desconto de 10%")
                    print(f"Valor Total: R$ {total:.2f}")
                    
                elif forma_pagamento == 2:
                    print(f"Valor Total: R$ {preco:.2f}")
                    
                else:
                    print("Opção inválida!")
                ```
                
            - [PYI010] Escreva um programa que receba a temperatura em Celsius e converta para Fahrenheit ou Kelvin conforme escolha do usuário.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                celsius = float(input("Digite a temperatura em Celsius: "))
                
                print("Escolha a unidade para conversão:")
                print("1 - Fahrenheit")
                print("2 - Kelvin")
                
                opcao = int(input("Digite o número da opção: "))
                
                if opcao == 1:
                    fahrenheit = (celsius * 9/5) + 32
                    print(f"{celsius:.2f}°C equivalem a {fahrenheit:.2f}°F")
                elif opcao == 2:
                    kelvin = celsius + 273.15
                    print(f"{celsius:.2f}°C equivalem a {kelvin:.2f} K")
                else:
                    print("Opção inválida!")
                
                ```
                
            - [PYI011] Escreva um programa que receba o salário de um funcionário e aplique um aumento conforme a tabela: 
            Até R$ 1500,00 → aumento de 15% 
            De R$ 1500,01 até R$ 2500,00 → aumento de 10% 
            Acima de R$ 2500,00 → aumento de 5% 
            Mostre o salário ajustado.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                salario = float(input("Digite o salário do funcionário: R$ "))
                
                if salario <= 1500.00:
                    aumento = salario * 0.15
                elif salario <= 2500.00:
                    aumento = salario * 0.10
                else:
                    aumento = salario * 0.05
                
                salario_ajustado = salario + aumento
                
                print(f"Salário original: R$ {salario:.2f}")
                print(f"Aumento aplicado: R$ {aumento:.2f}")
                print(f"Salário ajustado: R$ {salario_ajustado:.2f}")
                
                ```
                
            - [PYI012] Escreva um programa que receba o peso (kg) e a altura (m) de uma pessoa e calcule o IMC = peso / (altura²). Mostre a classificação conforme a faixa do IMC: 
            Menor que 18,5 → Abaixo do peso 
            Entre 18,5 e 24,9 → Peso normal 
            Entre 25 e 29,9 → Sobrepeso 
            Entre 30 e 34,9 → Obesidade grau I 
            Entre 35 e 39,9 → Obesidade grau II 
            Maior ou igual a 40 → Obesidade grau III
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                peso = float(input("Digite o peso em kg: "))
                altura = float(input("Digite a altura em metros: "))
                
                imc = peso / (altura ** 2)
                
                print(f"IMC: {imc:.2f}")
                
                if imc < 18.5:
                    classificacao = "Abaixo do peso"
                elif 18.5 <= imc <= 24.9:
                    classificacao = "Peso normal"
                elif 25 <= imc <= 29.9:
                    classificacao = "Sobrepeso"
                elif 30 <= imc <= 34.9:
                    classificacao = "Obesidade grau I"
                elif 35 <= imc <= 39.9:
                    classificacao = "Obesidade grau II"
                else:  # imc >= 40
                    classificacao = "Obesidade grau III"
                
                print(f"Classificação: {classificacao}")
                
                ```
                
            - [PYI013] Escreva um programa que receba um número inteiro entre 1 e 7 e mostre o dia da semana correspondente (1 = Domingo, 7 = Sábado). Se inválido, mostre mensagem de erro.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                num = int(input("Digite um número inteiro entre 1 e 7: "))
                
                if num == 1:
                    print("Domingo")
                elif num == 2:
                    print("Segunda-feira")
                elif num == 3:
                    print("Terça-feira")
                elif num == 4:
                    print("Quarta-feira")
                elif num == 5:
                    print("Quinta-feira")
                elif num == 6:
                    print("Sexta-feira")
                elif num == 7:
                    print("Sábado")
                else:
                    print("Número inválido! Digite um valor entre 1 e 7.")
                ```
                
            - [PYI014] Escreva um programa que receba um ano e diga se ele é bissexto.
            Um ano bissexto é um ano divisível por 4 e não divisível por 100, a menos que também seja divisível por 400.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                ano = int(input("Digite um ano: "))
                
                if (ano % 4 == 0 and ano % 100 != 0) or (ano % 400 == 0):
                    print(f"O ano {ano} é bissexto.")
                else:
                    print(f"O ano {ano} não é bissexto.")
                ```
                
            - [PYI015] Escreva um programa que receba a hora atual (0 a 23) e mostre uma saudação: 
            00 a 11 → Bom dia 
            12 a 17 → Boa tarde 
            18 a 23 → Boa noite 
            Se a hora for inválida, exiba "Hora inválida".
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                hora = int(input("Digite a hora atual (0 a 23): "))
                
                if 0 <= hora <= 11:
                    print("Bom dia")
                elif 12 <= hora <= 17:
                    print("Boa tarde")
                elif 18 <= hora <= 23:
                    print("Boa noite")
                else:
                    print("Hora inválida")
                ```
                
        - Laços de Repetição
            - [PYI016] Faça um programa que inicie uma contagem regressiva de 10 até 1, imprimindo cada número na tela.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                for i in range(10, 0, -1):
                    print(i)
                ```
                
            - [PYI017] Crie um jogo onde o computador escolhe um número aleatório entre 1 e 100, e o jogador tenta adivinhar. O jogo continua até que o jogador acerte o número.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                import random
                
                numero_secreto = random.randint(1, 100)
                tentativa = None
                tentativas = 0
                
                print("Estou pensando em um número entre 1 e 100. Tente adivinhar!")
                
                while tentativa != numero_secreto:
                    tentativa = int(input("Digite seu palpite: "))
                    tentativas += 1
                
                    if tentativa < numero_secreto:
                        print("Muito baixo! Tente um número maior.")
                    elif tentativa > numero_secreto:
                        print("Muito alto! Tente um número menor.")
                    else:
                        print(f"Parabéns! Você acertou o número em {tentativas} tentativas.")
                ```
                
            - [PYI018] Crie um programa que receba um número inteiro e calcule a soma dos seus dígitos.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                num = input("Digite um número inteiro: ")
                
                soma = 0
                for digito in num:
                    if digito.isdigit():
                        soma += int(digito)
                
                print(f"A soma dos dígitos é: {soma}")
                ```
                
            - [PYI019] Peça ao usuário para inserir um número e imprima a tabuada desse número de 1 a 10.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                num = int(input("Digite um número para ver a tabuada: "))
                
                print(f"Tabuada do {num}:")
                
                for i in range(1, 11):
                    resultado = num * i
                    print(f"{num} x {i} = {resultado}")
                ```
                
            - [PYI020] Desenvolva um programa que use um loop `while` para gerar uma sequência de números pares começando em 2, imprimindo-os até que o número seja maior que 20.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                num = 2
                
                while num <= 20:
                    print(num)
                    num += 2
                ```
                
            - [PYI021] Faça um programa que calcule e imprima a soma dos números de 1 a N, onde N é um número inteiro fornecido pelo usuário.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                N = int(input("Digite um número inteiro N: "))
                
                soma = 0
                for i in range(1, N + 1):
                    soma += i
                
                print(f"A soma dos números de 1 até {N} é: {soma}")
                ```
                
            - [PYI022] Crie um programa que leia números do usuário até que ele digite zero, então mostre a soma total dos números digitados (excluindo o zero).
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                soma = 0
                
                while True:
                    num = int(input("Digite um número (0 para sair): "))
                    if num == 0:
                        break
                    soma += num
                
                print(f"A soma total dos números digitados é: {soma}")
                ```
                
            - [PYI023] Faça um programa que receba uma sequência de números inteiros e imprima o maior e o menor número da sequência. A entrada termina quando o usuário digitar o número zero.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                maior = None
                menor = None
                
                while True:
                    num = int(input("Digite um número inteiro (0 para sair): "))
                    if num == 0:
                        break
                    if maior is None or num > maior:
                        maior = num
                    if menor is None or num < menor:
                        menor = num
                
                if maior is None:
                    print("Nenhum número foi digitado.")
                else:
                    print(f"O maior número digitado foi: {maior}")
                    print(f"O menor número digitado foi: {menor}")
                ```
                
            - [PYI024] Faça um programa que receba uma lista de números inteiros e imprima a quantidade de números pares e a quantidade de números ímpares na lista.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                pares = 0
                impares = 0
                
                print("Digite números inteiros um a um. Para parar, apenas pressione Enter sem digitar nada.")
                
                while True:
                    entrada = input("Digite um número (ou Enter para sair): ")
                    if entrada == "":
                        break
                    num = int(entrada)
                    if num % 2 == 0:
                        pares += 1
                    else:
                        impares += 1
                
                print(f"Quantidade de números pares: {pares}")
                print(f"Quantidade de números ímpares: {impares}")
                
                ```
                
            - [PYI025] Faça um programa que leia vários números positivos e pare a leitura quando um número negativo for digitado. Imprima a média dos números positivos.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                soma = 0
                contador = 0
                
                print("Digite números positivos. Para parar, digite um número negativo.")
                
                while True:
                    num = float(input("Digite um número: "))
                    if num < 0:
                        break
                    soma += num
                    contador += 1
                
                if contador > 0:
                    media = soma / contador
                    print(f"A média dos números positivos digitados é: {media:.2f}")
                else:
                    print("Nenhum número positivo foi digitado.")
                ```
                
            - [PYI026] Crie um programa que receba um número inteiro e imprima todos os seus divisores.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                num = int(input("Digite um número inteiro: "))
                
                print(f"Divisores de {num}:")
                
                for i in range(1, abs(num) + 1):
                    if num % i == 0:
                        print(i)
                ```
                
            - [PYI027] Faça um programa que leia um texto do usuário e conte quantas vogais ele possui.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                texto = input("Digite um texto: ")
                
                vogais = "aeiouAEIOU"
                contador = 0
                
                for letra in texto:
                    if letra in vogais:
                        contador += 1
                
                print(f"O texto possui {contador} vogais.")
                ```
                
            - [PYI028] Crie um programa que leia uma palavra e informe se ela é um palíndromo (lê-se igual de trás para frente).
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                palavra = input("Digite uma palavra: ").lower()
                
                if palavra == palavra[::-1]:
                    print("É palíndromo!")
                else:
                    print("Não é palíndromo!")
                ```
                
        - Desafios
            - [PYD001] Escreva um programa que receba um número inteiro positivo `N` e imprima todos os números de 1 até `N` que sejam múltiplos de 3 ou de 5, mas não de ambos ao mesmo tempo. Use laços e estruturas condicionais para isso.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                
                ```
                
            - [PYD002] Implemente um programa que receba dois números inteiros `A` e `B` (onde `A < B`), e imprima todos os números pares entre `A` e `B` (inclusive), usando um laço `for` e o comando `continue` para pular os números ímpares.
                
                <aside>
                💡
                
                Solução Sugerida
                
                </aside>
                
                ```python
                
                ```
                
            - [PYD003] Implemente um programa que receba dois números inteiros `A` e `B` (sendo que `A` pode ser maior ou menor que `B`). O programa deve imprimir todos os números entre `A` e `B` (inclusive), em ordem decrescente se `A > B` ou crescente se `A < B`.
            - [PYD004] Implemente um programa que receba dois números inteiros `X` e `Y` que tenham no mínimo 3 dígitos cada um. Calcule a soma de todos os números entre eles (inclusive), que sejam múltiplos de 3 ou múltiplos de 5, mas **não** múltiplos de ambos.
            - [PYD005] Implemente um programa que receba dois números inteiros positivos `M` e `N` do usuário e imprima a tabela de multiplicação de `M` de 1 até `N`. Além disso, ao final, mostre a soma de todos os resultados calculados na tabela.
    - Exercícios Temáticos
        - Variáveis e Tipos de Dados
            - [PYT001] A Loja de Animais de Seu Creso
                
                Seu Creso tem uma loja de animais e precisa de um programa que armazene o nome de cada animal, sua espécie e idade em anos.
                
                Além disso, ele quer saber quanto cada um dos animais come em gramas de ração por dia.
                
                Crie variáveis para armazenar essas informações e exiba tudo de maneira organizada para Seu Creso revisar.
                
            - [PYT002] Estoque de Frutas do Mix Tadeu
                
                No Mercado Mix Tadeu, a seção de frutas precisa registrar o tipo de cada fruta, a quantidade em estoque, o preço por quilo e uma informação booleana que indique se a fruta está na promoção ou não. 
                
                Escreva um programa que registre esses dados para quatro frutas diferentes e exiba uma tabela com as informações para o gerente.
                
            - [PYT003] Calculadora de Viagem da Família Silva
                
                A família Silva vai fazer uma viagem de carro e quer saber quanto vai gastar.
                
                Escreva um programa que receba o número de quilômetros da viagem, o preço médio do litro de gasolina e o consumo do carro (km/L), e exiba o valor total que será gasto com combustível.
                
            - [PYT004] A Conta de Luz de Dona Cida
                
                Dona Cida quer saber quanto sua conta de luz vai custar este mês.
                
                Crie um programa que armazene a quantidade de kWh consumidos, 
                o preço do kWh e o valor da taxa mínima.
                
                O programa deve calcular e exibir o valor total da conta.
                
            - [PYT005] Super Planilha de Notas Escolares
                
                Gervásio quer um programa que armazene suas notas em quatro matérias e calcule a média.
                
                Use variáveis para guardar o nome de cada matéria, as notas de cada uma e exiba a média final, junto com as notas e os nomes das matérias.
                
        - Estruturas Condicionais
            - [PYT006] Ingressos para o Zoológico
                
                No zoológico, crianças até 12 anos não pagam ingresso, enquanto adultos pagam R$ 20,00 e idosos (acima de 60) pagam metade. 
                
                Escreva um programa que pergunte a idade de uma pessoa e exiba o valor do ingresso.
                
            - [PYT007] Feira de Descontos do Mercado Mix Tadeu
                
                Na Feira de Descontos, o cliente ganha desconto conforme a quantidade de produtos comprados: 
                
                até 5 itens, sem desconto; 
                
                de 6 a 10 itens, desconto de 5%; 
                
                acima de 10 itens, 10% de desconto.
                
                Escreva um programa que leia a quantidade de itens e o valor total, aplicando 
                o desconto apropriado.
                
            - [PYT008] Jogo do Palpite
                
                Um sistema de palpites utiliza um número aleatório para que o usuário tente acertar. O número aleatório varia de 1 a 100. 
                
                O jogo começa pedindo que o usuário insira um número.
                
                Se o número for menor que o número aleatório, o sistema deve exibir "Muito baixo!", se for exatamente o número aleatório, deve exibir "Parabéns, acertou!", e se for maior que o número aleatório, deve exibir "Muito alto!".
                
            - [PYT009] Aprovado, Recuperação ou Chocolate?
                
                Uma escola considera um aluno aprovado se a média das suas três notas for maior ou igual a 7. Caso contrário, ele vai para recuperação.
                Porém, se o aluno tiver uma média 10, ele ganha um chocolate.
                
                Escreva um programa que receba três notas e informe se o aluno foi aprovado, se ganhou um chocolate ou se precisa de recuperação. 
                
            - [PYT010] Desconto no Plano da Academia
                
                Uma academia oferece um desconto de 20% para pessoas que treinam mais de 5 vezes por semana. 
                
                Escreva um programa que pergunte quantos dias o usuário treina por semana e mostre o valor com desconto, caso aplicável.
                
        - Laços de Repetição
            - [PYT011] O aniversário de Genésia
                
                Genésia quer fazer uma contagem regressiva de dias até seu aniversário. 
                Escreva um programa que receba o número de dias até o aniversário dela 
                e conte até zero, exibindo uma mensagem para cada dia que passa.
                
            - [PYT012] Loja de Tintas de Seu Alfredo
                
                Seu Alfredo precisa calcular o valor total das latas de tinta vendidas em um dia.
                
                Para isso, crie um programa que deve perguntar quantas latas foram vendidas 
                e o preço de cada uma, repetindo o processo até que todos os preços 
                sejam informados, e exibindo o total no final.
                
            - [PYT013] Sequência dos Números Ímpares
                
                Francisca Leopoldina quer visualizar todos os números ímpares
                de 1 até um valor máximo definido por ela.
                
                Crie um programa que exiba a sequência de números ímpares até o valor escolhido.
                
            - [PYT014] Quizz do Conhecimento
                
                Crie um pequeno quiz de 5 perguntas. Cada vez que o usuário responde, 
                o programa deve exibir a próxima pergunta e ao final mostrar o número total 
                de acertos.
                
            - [PYT015] Multiplicação com Tabela
                
                Ermengarda quer estudar a tabuada de um número específico. 
                
                Escreva um programa que pergunte qual número ela deseja estudar 
                e exiba a tabuada dele do 1 até o 10.
                
            - Listas
                - [PYT016] Lista de Compras de Dona Cremilda
                    
                    Dona Cremilda quer organizar sua lista de compras.
                    
                    Crie um programa que permita adicionar itens a uma lista, remover itens 
                    e exibir a lista atualizada para Dona Cremilda revisar antes de ir às compras.
                    
                - [PYT017] Biblioteca Online do Seu Gumercindo
                    
                    Seu Gumercindo tem uma pequena biblioteca em casa e quer catalogar seus livros. 
                    
                    Crie um programa que permita adicionar, remover e listar os títulos 
                    dos livros em uma lista.
                    
                - [PYT018] Músicas Favoritas de Wesley
                    
                    Wesley quer criar uma lista com suas músicas favoritas.
                    
                    Escreva um programa que permita adicionar músicas a uma lista 
                    e exibir a lista completa ao final.
                    
                - [PYT019] Cadastro de Alunos
                    
                    Em uma turma, os alunos são registrados em uma lista.
                    
                    Escreva um programa que permita cadastrar o nome dos alunos e listar todos 
                    os nomes ao final, mostrando quantos alunos foram cadastrados.
                    
                - [PYT020] Top 10 Filmes
                    
                    Jurema quer organizar seus 10 filmes favoritos. 
                    
                    Crie um programa que permita adicionar até 10 filmes a uma lista. 
                    Caso mais de 10 filmes sejam inseridos, mostre uma mensagem de aviso.
                    
    
    ---
    
    <aside>
    2️⃣
    
    Exercícios de Fixação — Listas
    
    </aside>
    
    - Exercícios Básicos
        - [PYL001] Crie uma lista com três cores e mostre-a na tela.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            cores = ["vermelho", "azul", "verde"]
            print(cores)
            ```
            
        - [PYL002] Mostre o primeiro e o último elemento da lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            print("Primeira cor:", cores[0])
            print("Última cor:", cores[-1])
            ```
            
        - [PYL003] Adicione uma nova cor ao final da lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            cores.append("amarelo")
            print("Lista atualizada:", cores)
            ```
            
        - [PYL004] Remova a segunda cor da lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            del cores[1] 
            print("Após remoção:", cores)
            ```
            
        - [PYL005] Peça ao usuário para adicionar quantas cores ele quiser à lista de cores.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            while True:
                nova_cor = input("Digite uma cor para adicionar (ou 'sair' para parar): ")
                if nova_cor.lower() == 'sair':
                    break
                cores.append(nova_cor)
            
            print("Lista final de cores:", cores)
            ```
            
        - [PYL006] Determine quantos elementos existem na lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tamanho_da_lista = len(cores)
            print(f"Tem {tamanho_da_lista} cores na lista.")
            ```
            
        - [PYL007] Verifique se uma cor específica existe na lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            cor = input("Digite uma cor para verificar: ")
            if cor in cores:
                print(f"A cor '{cor}' está na lista.")
            else:
                print(f"A cor '{cor}' NÃO está na lista.")
            ```
            
        - [PYL008] Mostre todos os elementos da lista usando um laço `for`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            print("Cores na lista:")
            for cor in cores:
                print(cor)
            ```
            
        - [PYL009] Inverta a ordem dos elementos da lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            cores.reverse()
            print("Lista invertida:", cores)
            ```
            
        - [PYL010] Crie uma cópia da lista e adicione um novo elemento à cópia, mantendo a lista original inalterada.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            copia_cores = cores.copy()
            copia_cores.append("roxo")
            print("Lista original:", cores)
            print("Cópia modificada:", copia_cores)
            ```
            
        - [PYL011] Crie uma lista com números de 1 a 10 e mostre apenas os números pares.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            lista = []
            for i in range(1, 11):
                lista.append(i)
            
            for i in lista:
                if i % 2 == 0: print(i)
            ```
            
    - Exercícios Intermediários
        - **Sua geladeira está cheia de frutas! Crie uma lista com cinco frutas que você tem e imprima a lista.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            frutas = ["banana comprida", "laranja cravo", "umbu", "cajá", "mamão"]
            
            print(frutas)
            
            ```
            
        - **Você acabou de ganhar uma caixa de chocolates, mas só quer os de morango. Crie uma lista com os sabores e imprima só o sabor “morango” (se existir).**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            sabores = ["chocolate", "baunilha", "morango", "coco"]
            
            for sabor in sabores:
                if sabor == "morango":
                    print("Achei o de morango!")
            
            ```
            
        - **Faça uma lista com cinco filmes que você quer assistir. Adicione mais um filme no final da lista e mostre o tamanho da lista.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            filmes = ["Matrix", "Interestelar", "Duna", "A Origem", "Moana"]
            
            filmes.append("Robocop")
            print("Total de filmes:", len(filmes))
            
            ```
            
        - **Você é um colecionador de canecas estranhas. Remova a caneca com gatinhos da lista porque seu gato não gostou.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            canecas = ["com listras", "com gatinhos", "transparente", "de caveira"]
            
            canecas.remove("com gatinhos")
            print(canecas)
            
            ```
            
        - **Faça uma lista com números de 1 a 20 e imprima somente os números que são múltiplos de 3.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            numeros = list(range(1, 21))
            
            for numero in numeros:
                if numero % 3 == 0:
                    print(numero)
            
            ```
            
        - **Você tem uma lista de convidados para sua festa. Adicione três novos convidados no início da lista (eles são VIPs).**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            convidados = ["Tadeu", "Gervásio", "Jurema"]
            
            convidados.insert(0, "VIP1")
            convidados.insert(0, "VIP2")
            convidados.insert(0, "VIP3")
            
            print(convidados)
            
            ```
            
        - **Seus amigos gostam de emojis! Crie uma lista com emojis de comida e substitua o emoji “🍕” pelo emoji “🍣”.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            emojis = ["🍕", "🍔", "🍟", "🍕", "🌮"]
            
            for i in range(len(emojis)):
                if emojis[i] == "🍕":
                    emojis[i] = "🍣"
            
            print(emojis)
            
            ```
            
        - **Você quer dividir uma pizza com seus amigos e precisa de fatias iguais. Dada uma lista com as quantidades de fatias que cada amigo come, calcule a média de fatias consumidas.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            fatias = [3, 4, 2, 5, 3]
            
            soma = sum(fatias)
            quantidade = len(fatias)
            media = soma / quantidade
            
            print("Média de fatias:", media)
            
            ```
            
        - **Seu time de futebol quer saber quem marcou mais gols. Dada uma lista com os gols de cada jogador, imprima o número máximo e quem marcou.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            gols = [2, 5, 1, 4]
            jogadores = ["Tadeu", "Gervásio", "Jeremias", "Aderbal"]
            
            maior_gols = max(gols)
            indice = gols.index(maior_gols)
            jogador = jogadores[indice]
            
            print("Quem marcou mais gols foi:", jogador)
            print("Gols marcados:", maior_gols)
            
            ```
            
        - **Você está fazendo uma lista de tarefas para a semana, mas está com preguiça de ordenar. Crie uma função que receba essa lista e retorne ela ordenada sem modificar a original.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def ordenar_tarefas(lista):
                copia = lista.copy()
                copia.sort()
                return copia
            
            tarefas = ["lavar roupa", "estudar", "cozinhar", "limpar"]
            ordenada = ordenar_tarefas(tarefas)
            
            print("Original:", tarefas)
            print("Ordenada:", ordenada)
            
            ```
            
        - **Você quer contar quantas vezes cada letra aparece em uma palavra (por exemplo, “banana”). Faça uma função que receba uma palavra e retorne um dicionário com a frequência das letras.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def contar_letras(palavra):
                frequencia = {}
            
                for letra in palavra:
                    if letra in frequencia:
                        frequencia[letra] += 1
                    else:
                        frequencia[letra] = 1
            
                return frequencia
            
            resultado = contar_letras("banana")
            print(resultado)
            
            ```
            
        
        - **Você tem uma lista gigante de números e quer os 5 maiores. Escreva uma função que receba essa lista e retorne os cinco maiores números em ordem decrescente.**
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def cinco_maiores(lista):
                lista.sort(reverse=True)
                return lista[:5]
            
            numeros = [4, 15, 2, 30, 10, 8, 50, 22]
            maiores = cinco_maiores(numeros)
            print(maiores)
            
            ```
            
    
    ---
    
    <aside>
    3️⃣
    
    Exercícios de Fixação — Funções
    
    </aside>
    
    - Exercícios Básicos
        - [PYF001] Crie uma função que imprima "Olá, mundo!".
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF002] Crie uma função que receba um nome como parâmetro e imprima "Olá, [nome]!".
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF003] Crie uma função que receba dois números e imprima sua soma.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF004] Crie uma função que receba dois números e retorne o maior deles.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF005] Crie uma função que receba uma lista de números e retorne a soma de seus elementos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF006] Crie uma função que receba uma string e retorne a quantidade de vogais nela.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF007] Crie uma função que receba um número inteiro positivo **`n`** e calcule seu fatorial usando loop.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF008] Crie uma função recursiva que calcule o fatorial de um número inteiro positivo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF009] Crie uma função que receba uma lista de números e retorne uma nova lista apenas com os números pares.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
        - [PYF010] Crie uma função que receba dois números e um operador ('+', '-', '*', '/') e retorne o resultado da operação matemática, tratando casos de divisão por zero.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            
            ```
            
    - Exercícios Avançados
        - [PYF011] Crie uma função que receba uma lista de nomes e retorne uma nova lista contendo apenas os nomes que começam com letra maiúscula.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def nomes_maiuscula(lista_nomes):
                return [nome for nome in lista_nomes if nome[0].isupper()]
            
            nomes = ['Tadeu', 'Jurema', 'genésio', 'aderbal', 'Gervásio']
            print(nomes_maiuscula(nomes))
            ```
            
        - [PYF012] Faça uma função que receba uma lista de números e retorne uma nova lista com cada número multiplicado por 2.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def multiplica_por_dois(numeros):
                return [n * 2 for n in numeros]
            
            lista = [1, 4, 7, 10]
            print(multiplica_por_dois(lista))
            ```
            
        - [PYF013] Crie uma função que receba uma string e retorne a string invertida.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def inverter_string(texto):
                return texto[::-1]
            
            print(inverter_string('Python'))
            ```
            
        - [PYF014] Faça uma função que receba uma frase e retorne a quantidade de palavras que ela possui.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def contar_palavras(frase):
                palavras = frase.split()
                return len(palavras)
            
            print(contar_palavras('Hoje é um ótimo dia para aprender Python'))
            ```
            
        - [PYF015] Crie uma função que receba uma lista e um elemento, e retorne quantas vezes esse elemento aparece na lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def contar_elemento(lista, elemento):
                return lista.count(elemento)
            
            lista = [1, 2, 3, 2, 4, 2, 5]
            print(contar_elemento(lista, 2))
            ```
            
        - [PYF016] Faça uma função que receba uma lista de strings e retorne uma lista com o tamanho de cada string.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def tamanhos_strings(lista):
                return [len(s) for s in lista]
            
            lista = ['casa', 'carro', 'bicicleta']
            print(tamanhos_strings(lista))
            ```
            
        - [PYF017] Crie uma função que receba uma lista de números e retorne a soma apenas dos números positivos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def soma_positivos(lista):
                return sum(n for n in lista if n > 0)
            
            lista = [10, -5, 3, -1, 7]
            print(soma_positivos(lista))
            ```
            
        - [PYF018] Faça uma função que receba uma lista de números e retorne o índice do menor valor presente na lista.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def indice_menor(lista):
                menor = min(lista)
                return lista.index(menor)
            
            lista = [5, 2, 9, 1, 7]
            print(indice_menor(lista))
            ```
            
        - [PYF019] Crie uma função que receba uma lista de strings e retorne uma única string com todos os elementos concatenados, separados por vírgula.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def juntar_strings(lista):
                return ', '.join(lista)
            
            lista = ['maçã', 'banana', 'laranja']
            print(juntar_strings(lista))
            ```
            
        - [PYF020] Faça uma função que receba um texto e retorne o mesmo texto sem as vogais.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def remover_vogais(texto):
                vogais = 'aeiouAEIOU'
                return ''.join(letra for letra in texto if letra not in vogais)
            
            texto = 'Olá, tudo bem?'
            print(remover_vogais(texto))
            ```
            
    
    <aside>
    4️⃣
    
    Exercícios de Fixação — Coleções
    
    </aside>
    
    - Exercícios de Dicionários
        - [PYC001] Crie um dicionário com três pessoas e suas idades.
            
            *Dica: Dicionários são criados com chaves `{}` e pares chave:valor separados por vírgula.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            print(pessoas)
            ```
            
        - [PYC002] Adicione um novo par chave-valor ao dicionário.
            
            *Dica: Use `dicionario[chave] = valor` para adicionar ou atualizar itens.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            pessoas['Aderbal'] = 28
            print(pessoas)
            ```
            
        - [PYC003] Remova uma chave específica do dicionário.
            
            *Dica: Use `del dicionario[chave]` ou `pop()` para remover.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            del pessoas['Francisca']
            print(pessoas)
            ```
            
        - [PYC004] Verifique se uma determinada chave existe no dicionário.
            
            *Dica: Use o operador `in`, como `if chave in dicionario:`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            print('Gervásio' in pessoas)
            ```
            
        - [PYC005] Imprima todas as chaves do dicionário.
            
            *Dica: Use o método `.keys()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            print(pessoas.keys())
            ```
            
        - [PYC006] Imprima todas as chaves e valores usando um loop.
            
            *Dica: Use `.items()` para iterar sobre chaves e valores.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            for nome, idade in pessoas.items():
                print(nome, idade)
            ```
            
        - [PYC007] Atualize o valor de uma chave existente.
            
            *Dica: Atribua diretamente: `dicionario[chave] = novo_valor`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            pessoas['Gervásio'] = 31
            print(pessoas)
            ```
            
        - [PYC008] Faça uma cópia rasa do dicionário.
            
            *Dica: Use o método `.copy()` para copiar sem linkar referências.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            pessoas_copia = pessoas.copy()
            print(pessoas_copia)
            ```
            
        - [PYC009] Crie um dicionário que conte a frequência de caracteres em uma string.
            
            *Dica: Use um loop e o método `.get(chave, 0)` para contar.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            texto = "banana"
            frequencia = {}
            for letra in texto:
                frequencia[letra] = frequencia.get(letra, 0) + 1
            print(frequencia)
            ```
            
        - [PYC010] Ordene um dicionário pelo valor e imprima o resultado.
            
            *Dica: Use `sorted(dicionario.items(), key=lambda item: item[1])`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            pessoas = {'Tadeu': 25, 'Gervásio': 30, 'Francisca': 22}
            ordenado = dict(sorted(pessoas.items(), key=lambda item: item[1]))
            print(ordenado)
            ```
            
    - Exercícios de Tuplas
        - [PYC011] Crie uma tupla com cinco elementos e imprima o terceiro.
            
            *Dica: Tuplas são definidas com parênteses `()` e são imutáveis.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tupla = (10, 20, 30, 40, 50)
            print(tupla[2])
            ```
            
        - [PYC012] Tente modificar um elemento da tupla e observe o erro.
            
            *Dica: Tuplas não permitem alterações depois de criadas.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tupla = (10, 20, 30, 40, 50)
            try:
                tupla[1] = 25
            except TypeError as e:
                print(e)
            ```
            
        - [PYC013] Desempacote uma tupla em variáveis separadas.
            
            *Dica: Use `a, b, c = tupla` para desempacotamento.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tupla = (10, 20, 30, 40, 50)
            a, b, c, d, e = tupla
            print(a, b, c, d, e)
            ```
            
        - [PYC014] Use tuplas para trocar os valores de duas variáveis.
            
            *Dica: A troca pode ser feita em uma linha: `a, b = b, a`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            x = 5
            y = 10
            x, y = y, x
            print(x, y)
            ```
            
        - [PYC015] Conte quantas vezes um elemento aparece na tupla.
            
            *Dica: Use a função `.count()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tupla = (10, 20, 30, 40, 50)
            print(tupla.count(30))
            ```
            
        - [PYC016] Concatene duas tuplas.
            
            *Dica: Use o operador `+`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            t1 = (1, 2)
            t2 = (3, 4)
            t3 = t1 + t2
            print(t3)
            ```
            
        - [PYC017] Crie uma tupla aninhada e acesse um elemento interno.
            
            *Dica: Use índices duplos, por exemplo, `tupla[0][1]`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            t_aninhada = (1, (2, 3), 4)
            print(t_aninhada[1][1])
            ```
            
        - [PYC018] Converta uma lista em tupla e vice-versa.
            
            *Dica: Use as funções `tuple()` e `list()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            lista = [1, 2, 3]
            tupla_da_lista = tuple(lista)
            lista_da_tupla = list(tupla_da_lista)
            print(tupla_da_lista, lista_da_tupla)
            ```
            
        - [PYC019] Use uma tupla como chave de um dicionário.
            
            *Dica: Tuplas são imutáveis e podem ser usadas como chaves, listas não.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            d = {}
            d[(1, 2)] = "ponto"
            print(d)
            ```
            
        - [PYC020] Crie uma tupla de tuplas e percorra seus elementos.
            
            *Dica: Use loops aninhados para acessar elementos internos.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            tuplas = ((1, 2), (3, 4), (5, 6))
            for t in tuplas:
                print(t)
            ```
            
    - Exercícios de Sets
        - [PYC021] Crie um conjunto com alguns números repetidos e mostre que duplicatas são removidas.
            
            *Dica: Conjuntos são criados com chaves `{}` ou com `set()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conjunto = {1, 2, 2, 3, 4, 4, 5}
            print(conjunto)
            ```
            
        - [PYC022] Adicione um elemento novo a um conjunto.
            
            *Dica: Use o método `.add()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conjunto = {1, 2, 3, 4, 5}
            conjunto.add(6)
            print(conjunto)
            ```
            
        - [PYC023] Remova um elemento usando `discard()` e depois usando `remove()`, e observe a diferença.
            
            *Dica: `discard()` não dá erro se o elemento não existir, `remove()` dá.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conjunto = {1, 2, 3, 4, 5}
            conjunto.discard(10)  # não gera erro
            try:
                conjunto.remove(10)  # gera erro
            except KeyError as e:
                print(e)
            ```
            
        - [PYC024] Faça a união de dois conjuntos e imprima o resultado.
            
            *Dica: Use o operador `|` ou o método `.union()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conj1 = {1, 2, 3}
            conj2 = {3, 4, 5}
            uniao = conj1 | conj2
            print(uniao)
            ```
            
        - [PYC025] Calcule a interseção entre dois conjuntos.
            
            *Dica: Use o operador `&` ou o método `.intersection()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conj1 = {1, 2, 3}
            conj2 = {3, 4, 5}
            intersecao = conj1 & conj2
            print(intersecao)
            ```
            
        - [PYC026] Calcule a diferença entre dois conjuntos.
            
            *Dica: Use o operador `-` ou o método `.difference()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conj1 = {1, 2, 3}
            conj2 = {3, 4, 5}
            diferenca = conj1 - conj2
            print(diferenca)
            ```
            
        - [PYC027] Verifique se um conjunto é subconjunto de outro.
            
            *Dica: Use o método `.issubset()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            print({1, 2}.issubset({1, 2, 3}))
            ```
            
        - [PYC028] Limpe todos os elementos de um conjunto.
            
            *Dica: Use o método `.clear()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conj1 = {1, 2, 3}
            conj1.clear()
            print(conj1)
            ```
            
        - [PYC029] Crie um conjunto vazio e adicione elementos dinamicamente.
            
            *Dica: Para conjunto vazio use `set()`, pois `{}` cria um dicionário.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            conjunto_vazio = set()
            conjunto_vazio.add(100)
            print(conjunto_vazio)
            ```
            
        - [PYC030] Use conjuntos para remover duplicatas de uma lista.
            
            *Dica: Converta a lista para `set` e depois para lista novamente.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            lista_com_duplicatas = [1, 2, 2, 3, 4, 4, 5]
            lista_sem_duplicatas = list(set(lista_com_duplicatas))
            print(lista_sem_duplicatas)
            ```
            
    
    <aside>
    5️⃣
    
    Exercícios de Fixação — Manipulação de Arquivos
    
    </aside>
    
    - Lista de Exercícios
        - [PYA001] Crie um arquivo texto chamado `arquivo1.txt` e escreva uma frase simples nele.
            
            *Dica: Use `open('arquivo1.txt', 'w')` para criar e escrever.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('arquivo1.txt', 'w')
            arquivo.write('Esta é uma frase simples.')
            arquivo.close()
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'w') as arquivo:
                arquivo.write('Esta é uma frase simples.')
            ```
            
        - [PYA002] Abra o arquivo `arquivo1.txt` e imprima seu conteúdo na tela.
            
            *Dica: Use modo `'r'` para leitura e `read()` para obter o conteúdo.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('arquivo1.txt', 'r')
            conteudo = arquivo.read()
            print(conteudo)
            arquivo.close()
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'r') as arquivo:
                conteudo = arquivo.read()
                print(conteudo)
            ```
            
        - [PYA003] Acrescente (append) uma nova linha ao arquivo `arquivo1.txt`.
            
            *Dica: Use modo `'a'` para acrescentar sem apagar o conteúdo.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('arquivo1.txt', 'a')
            arquivo.write('\nEsta é uma nova linha.')
            arquivo.close()
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'a') as arquivo:
                arquivo.write('\nEsta é uma nova linha.')
            ```
            
        - [PYA004] Leia o arquivo `arquivo1.txt` e imprima linha por linha.
            
            *Dica: Itere sobre o arquivo diretamente com `for linha in arquivo`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('arquivo1.txt', 'r')
            for linha in arquivo:
                print(linha.strip())
            arquivo.close()
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'r') as arquivo:
                for linha in arquivo:
                    print(linha.strip())
            ```
            
        - [PYA005] Crie um arquivo chamado `numeros.txt` e escreva os números de 1 a 10, um por linha.
            
            *Dica: Use um loop para escrever cada número com `write()` e `\n`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('numeros.txt', 'w')
            for i in range(1, 11):
                arquivo.write(f'{i}\n')
            arquivo.close()
            
            ## usando o 'with open'
            
            with open('numeros.txt', 'w') as arquivo:
                for i in range(1, 11):
                    arquivo.write(f'{i}\n')
            ```
            
        - [PYA006] Leia o arquivo `numeros.txt` e calcule a soma dos números.
            
            *Dica: Converta cada linha lida para inteiro antes de somar.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('numeros.txt', 'r')
            total = 0
            for linha in arquivo:
                total += int(linha.strip())
            arquivo.close()
            print(total)
            
            ## usando o 'with open'
            
            with open('numeros.txt', 'r') as arquivo:
                total = sum(int(linha.strip()) for linha in arquivo)
            print(total)
            ```
            
        - [PYA007] Copie o conteúdo de `arquivo1.txt` para um novo arquivo chamado `arquivo_copia.txt`.
            
            *Dica: Leia o conteúdo e escreva no novo arquivo.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo_origem = open('arquivo1.txt', 'r')
            arquivo_destino = open('arquivo_copia.txt', 'w')
            conteudo = arquivo_origem.read()
            arquivo_destino.write(conteudo)
            arquivo_origem.close()
            arquivo_destino.close()
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'r') as arquivo_origem:
                conteudo = arquivo_origem.read()
            with open('arquivo_copia.txt', 'w') as arquivo_destino:
                arquivo_destino.write(conteudo)
            ```
            
        - [PYA008] Crie uma função que receba o nome de um arquivo e retorne a quantidade de linhas que ele possui.
            
            *Dica: Use `len(list(arquivo))` para contar as linhas.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def contar_linhas(nome_arquivo):
                arquivo = open(nome_arquivo, 'r')
                linhas = arquivo.readlines()
                arquivo.close()
                return len(linhas)
            
            print(contar_linhas('arquivo1.txt'))
            
            ## usando o 'with open'
            
            def contar_linhas(nome_arquivo):
                with open(nome_arquivo, 'r') as arquivo:
                    linhas = arquivo.readlines()
                return len(linhas)
            
            print(contar_linhas('arquivo1.txt'))
            
            ```
            
        - [PYA009] Faça um programa que leia um arquivo texto e conte quantas vezes uma palavra específica aparece.
            
            *Dica: Leia todo o texto e use o método `count()` da string.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            palavra = 'linha'
            arquivo = open('arquivo1.txt', 'r')
            conteudo = arquivo.read()
            arquivo.close()
            contador = conteudo.count(palavra)
            print(contador)
            
            ## usando o 'with open'
            
            palavra = 'linha'
            with open('arquivo1.txt', 'r') as arquivo:
                conteudo = arquivo.read()
            contador = conteudo.count(palavra)
            print(contador)
            ```
            
        - [PYA010] Crie um arquivo CSV simples com três colunas: nome, idade e cidade, e escreva cinco linhas.
            
            *Dica: Use o módulo `csv` e o método `writer.writerow()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            import csv
            
            arquivo = open('pessoas.csv', 'w', newline='')
            escritor = csv.writer(arquivo)
            escritor.writerow(['nome', 'idade', 'cidade'])
            escritor.writerow(['Tadeu', '25', 'Olinda'])
            escritor.writerow(['Gervásio', '30', 'Recife'])
            escritor.writerow(['Jurema', '22', 'Jaboatão'])
            escritor.writerow(['Genésia', '28', 'Paulista'])
            escritor.writerow(['Aderbal', '35', 'Abreu e Lima'])
            arquivo.close()
            
            ## usando o 'with open'
            
            import csv
            
            with open('pessoas.csv', 'w', newline='') as arquivo:
                escritor = csv.writer(arquivo)
                escritor.writerow(['nome', 'idade', 'cidade'])
            		escritor.writerow(['Tadeu', '25', 'Olinda'])
            		escritor.writerow(['Gervásio', '30', 'Recife'])
            		escritor.writerow(['Jurema', '22', 'Jaboatão'])
            		escritor.writerow(['Genésia', '28', 'Paulista'])
            		escritor.writerow(['Aderbal', '35', 'Abreu e Lima'])
            ```
            
        - [PYA011] Leia o arquivo CSV criado no exercício anterior e imprima cada linha formatada.
            
            *Dica: Use `csv.reader()` para iterar pelas linhas.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            import csv
            
            arquivo = open('pessoas.csv', 'r')
            leitor = csv.reader(arquivo)
            for linha in leitor:
                print(f'Nome: {linha[0]}, Idade: {linha[1]}, Cidade: {linha[2]}')
            arquivo.close()
            
            ## usando o 'with open'
            
            import csv
            
            with open('pessoas.csv', 'r') as arquivo:
                leitor = csv.reader(arquivo)
                for linha in leitor:
                    print(f'Nome: {linha[0]}, Idade: {linha[1]}, Cidade: {linha[2]}')
            ```
            
        - [PYA012] Crie um arquivo texto e salve uma lista de nomes recebida do usuário, um nome por linha.
            
            *Dica: Use `write()` em loop para salvar cada nome com `\n`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            nomes = []
            for _ in range(5):
            	nome = input("Digite um nome: ")
            	nomes.append(nome)
            
            arquivo = open('nomes.txt', 'w')
            for nome in nomes:
                arquivo.write(nome + '\n')
            arquivo.close()
            
            ## usando o 'with open'
            
            nomes = []
            for _ in range(5):
                nome = input("Digite um nome: ")
                nomes.append(nome)
            
            with open('nomes.txt', 'w') as arquivo:
                for nome in nomes:
                    arquivo.write(nome + '\n')
            ```
            
        - [PYA013] Faça um programa que leia um arquivo e exiba seu conteúdo em ordem inversa (última linha primeiro).
            
            *Dica: Leia todas as linhas para uma lista e use `reversed()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            arquivo = open('arquivo1.txt', 'r')
            linhas = arquivo.readlines()
            arquivo.close()
            for linha in reversed(linhas):
                print(linha.strip())
            
            ## usando o 'with open'
            
            with open('arquivo1.txt', 'r') as arquivo:
                linhas = arquivo.readlines()
            for linha in reversed(linhas):
                print(linha.strip())
            ```
            
        - [PYA014] Crie um programa que leia um arquivo de texto e substitua todas as ocorrências de uma palavra por outra.
            
            *Dica: Leia o texto todo, use `replace()`, e escreva novamente.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            palavra_antiga = 'linha'
            palavra_nova = 'linha_nova'
            
            arquivo = open('arquivo1.txt', 'r')
            conteudo = arquivo.read()
            arquivo.close()
            
            novo_conteudo = conteudo.replace(palavra_antiga, palavra_nova)
            
            arquivo = open('arquivo1.txt', 'w')
            arquivo.write(novo_conteudo)
            arquivo.close()
            
            ## usando o 'with open'
            
            palavra_antiga = 'linha'
            palavra_nova = 'linha_nova'
            
            with open('arquivo1.txt', 'r') as arquivo:
                conteudo = arquivo.read()
            
            novo_conteudo = conteudo.replace(palavra_antiga, palavra_nova)
            
            with open('arquivo1.txt', 'w') as arquivo:
                arquivo.write(novo_conteudo)
            ```
            
        - [PYA015] Implemente uma função que leia um arquivo grande (ex: >100MB) e conte quantas linhas começam com uma letra maiúscula.
            
            *Dica: Leia linha a linha para evitar usar muita memória e use `str[0].isupper()`.*
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def contar_maiusculas(nome_arquivo):
                arquivo = open(nome_arquivo, 'r')
                contador = 0
                for linha in arquivo:
                    if linha and linha[0].isupper():
                        contador += 1
                arquivo.close()
                return contador
                
            
            print(contar_maiusculas('arquivo1.txt'))
            
            ## usando o 'with open'
            
            def contar_maiusculas(nome_arquivo):
                contador = 0
                with open(nome_arquivo, 'r') as arquivo:
                    for linha in arquivo:
                        if linha and linha[0].isupper():
                            contador += 1
                return contador
            
            print(contar_maiusculas('arquivo1.txt'))
            ```
            
- Programação Orientada a Objetos
    
    <aside>
    6️⃣
    
    Exercícios de Fixação — Programação Orientada a Objetos
    
    </aside>
    
    - Lista de Exercícios
        - [POO001] Crie uma classe chamada `Pessoa` que tenha os atributos `nome` e `idade`. Instancie um objeto e imprima esses atributos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
            pessoa1 = Pessoa("Tadeu", 36)
            print(pessoa1.nome)
            print(pessoa1.idade)
            
            ```
            
        - [POO002] Adicione um método `apresentar()` à classe `Pessoa` que imprima uma mensagem com o nome e idade do objeto.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
                def apresentar(self):
                    print(f"Meu nome é {self.nome} e tenho {self.idade} anos.")
            
            pessoa1 = Pessoa("Tadeu", 36)
            pessoa1.apresentar()
            ```
            
        - [POO003] Crie uma classe `Carro` com atributos `marca` e `ano`. Instancie um carro e imprima seus atributos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Carro:
                def __init__(self, marca, ano):
                    self.marca = marca
                    self.ano = ano
            
            carro1 = Carro("Toyota", 2020)
            print(carro1.marca)
            print(carro1.ano)
            ```
            
        - [POO004] Crie um método dentro da classe `Carro` chamado `descricao()` que retorne uma string com a marca e o ano do carro.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Carro:
                def __init__(self, marca, ano):
                    self.marca = marca
                    self.ano = ano
            
                def descricao(self):
                    return f"Carro {self.marca}, ano {self.ano}"
            
            carro1 = Carro("Toyota", 2020)
            print(carro1.descricao())
            ```
            
        - [POO005] Crie uma classe `ContaBancaria` com atributos `titular` e `saldo`. Inicialize o saldo com zero.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class ContaBancaria:
                def __init__(self, titular):
                    self.titular = titular
                    self.saldo = 0
            
            conta1 = ContaBancaria("Tadeu")
            print(conta1.titular)
            print(conta1.saldo)
            ```
            
        - [POO006] Adicione um método `depositar(valor)` à classe `ContaBancaria` que aumente o saldo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class ContaBancaria:
                def __init__(self, titular):
                    self.titular = titular
                    self.saldo = 0
            
                def depositar(self, valor):
                    self.saldo += valor
            
            conta1 = ContaBancaria("Tadeu")
            conta1.depositar(500)
            print(conta1.saldo)
            
            ```
            
        - [POO007] Adicione um método `sacar(valor)` à classe `ContaBancaria` que diminua o saldo, se houver saldo suficiente.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class ContaBancaria:
                def __init__(self, titular):
                    self.titular = titular
                    self.saldo = 0
            
                def depositar(self, valor):
                    self.saldo += valor
            
                def sacar(self, valor):
                    if valor <= self.saldo:
                        self.saldo -= valor
                    else:
                        print("Saldo insuficiente")
            
            conta1 = ContaBancaria("Tadeu")
            conta1.depositar(500)
            conta1.sacar(200)
            print(conta1.saldo)
            conta1.sacar(400)  # aqui vai dar saldo insuficiente
            
            ```
            
        - [POO008] Crie uma classe `Retangulo` com atributos `largura` e `altura`. Adicione um método que calcule e retorne a área.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Retangulo:
                def __init__(self, largura, altura):
                    self.largura = largura
                    self.altura = altura
            
                def area(self):
                    return self.largura * self.altura
            
            retangulo1 = Retangulo(5, 3)
            print(retangulo1.area())
            
            ```
            
        - [POO009] Crie uma classe `Aluno` que herde da classe `Pessoa` (do exercício 1) e adicione um atributo `curso`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
            class Aluno(Pessoa):
                def __init__(self, nome, idade, curso):
                    super().__init__(nome, idade)
                    self.curso = curso
            
            aluno1 = Aluno("Francisca Leopoldina", 20, "Engenharia")
            print(aluno1.nome)
            print(aluno1.idade)
            print(aluno1.curso)
            
            ```
            
        - [POO010] Crie um método `mostrar_curso()` na classe `Aluno` que imprima o curso do aluno.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
            class Aluno(Pessoa):
                def __init__(self, nome, idade, curso):
                    super().__init__(nome, idade)
                    self.curso = curso
            
                def mostrar_curso(self):
                    print(f"O curso do aluno é {self.curso}")
            
            aluno1 = Aluno("Francisca Leopoldina", 20, "Engenharia")
            aluno1.mostrar_curso()
            
            ```
            
        
        <aside>
        6️⃣
        
        Exercícios de Fixação — Programação Orientada a Objetos — Métodos
        
        </aside>
        
        - [POOM01] Crie uma classe `Circulo` com atributo `raio` e um método `area()` que calcule a área do círculo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            import math
            
            class Circulo:
                def __init__(self, raio):
                    self.raio = raio
            
                def area(self):
                    return math.pi * (self.raio ** 2)
            
            c1 = Circulo(5)
            print(c1.area())
            ```
            
        - [POOM02] Na mesma classe `Circulo`, crie um método `perimetro()` que calcule o perímetro.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            import math
            
            class Circulo:
                def __init__(self, raio):
                    self.raio = raio
            
                def area(self):
                    return math.pi * (self.raio ** 2)
            
                def perimetro(self):
                    return 2 * math.pi * self.raio
            
            c1 = Circulo(5)
            print(c1.perimetro())
            
            ```
            
        - [POOM03] Crie uma classe `Lampada` com um atributo booleano `ligada` e métodos `ligar()` e `desligar()` que alterem o estado.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Lampada:
                def __init__(self):
                    self.ligada = False
            
                def ligar(self):
                    self.ligada = True
            
                def desligar(self):
                    self.ligada = False
            
            l = Lampada()
            l.ligar()
            print(l.ligada)
            l.desligar()
            print(l.ligada)
            
            ```
            
        - [POOM04] Crie um método `esta_ligada()` que retorne o estado atual da lâmpada (`True` ou `False`).
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Lampada:
                def __init__(self):
                    self.ligada = False
            
                def ligar(self):
                    self.ligada = True
            
                def desligar(self):
                    self.ligada = False
            
                def esta_ligada(self):
                    return self.ligada
            
            l = Lampada()
            l.ligar()
            print(l.esta_ligada())
            l.desligar()
            print(l.esta_ligada())
            
            ```
            
        - [POOM05] Crie uma classe `Calculadora` com métodos estáticos `somar(a, b)` e `multiplicar(a, b)` que retornem a soma e multiplicação dos números.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Calculadora:
                @staticmethod
                def somar(a, b):
                    return a + b
            
                @staticmethod
                def multiplicar(a, b):
                    return a * b
            
            print(Calculadora.somar(5, 7))
            print(Calculadora.multiplicar(5, 7))
            ```
            
        - [POOM06] Modifique a classe `Calculadora` para incluir um método de classe que retorne o nome da classe.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Calculadora:
                @staticmethod
                def somar(a, b):
                    return a + b
            
                @staticmethod
                def multiplicar(a, b):
                    return a * b
            
                @classmethod
                def nome_da_classe(cls):
                    return cls.__name__
            
            print(Calculadora.nome_da_classe())
            
            ```
            
        - [POOM07] Crie uma classe `Funcionario` com atributos `nome` e `salario` e um método `aumentar_salario(percentual)` que atualize o salário.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Funcionario:
                def __init__(self, nome, salario):
                    self.nome = nome
                    self.salario = salario
            
                def aumentar_salario(self, percentual):
                    self.salario += self.salario * percentual / 100
            
            f = Funcionario("Tadeu", 3000)
            f.aumentar_salario(10)
            print(f.salario)
            
            ```
            
        - [POOM08] Na classe `Funcionario`, crie um método `mostrar_dados()` que imprima nome e salário formatados.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Funcionario:
                def __init__(self, nome, salario):
                    self.nome = nome
                    self.salario = salario
            
                def aumentar_salario(self, percentual):
                    self.salario += self.salario * percentual / 100
            
                def mostrar_dados(self):
                    print(f"Nome: {self.nome}, Salário: R$ {self.salario:.2f}")
            
            f = Funcionario("Tadeu", 3000)
            f.aumentar_salario(10)
            f.mostrar_dados()
            
            ```
            
        - [POOM09] Crie uma classe `Relogio` que tenha um método estático `horario_atual()` que retorne a hora atual do sistema (use `datetime`).
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            from datetime import datetime
            
            class Relogio:
                @staticmethod
                def horario_atual():
                    return datetime.now().strftime("%H:%M:%S")
            
            print(Relogio.horario_atual())
            
            ```
            
        - [POOM10] Crie uma classe `Temperatura` com método estático que converta Celsius para Fahrenheit e outro método estático que converta Fahrenheit para Celsius.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Temperatura:
                @staticmethod
                def celsius_para_fahrenheit(c):
                    return (c * 9/5) + 32
            
                @staticmethod
                def fahrenheit_para_celsius(f):
                    return (f - 32) * 5/9
            
            print(Temperatura.celsius_para_fahrenheit(25))
            print(Temperatura.fahrenheit_para_celsius(77))
            
            ```
            
    
    <aside>
    7️⃣
    
    Exercícios de Fixação — Programação Orientada a Objetos — Encapsulamento
    
    </aside>
    
    - Lista de Exercícios
        - [POOE01] Crie uma classe `Pessoa` com atributo privado `_nome` e métodos públicos para definir e obter o nome (`set_nome()`, `get_nome()`).
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome):
                    self._nome = nome
            
                def get_nome(self):
                    return self._nome
            
                def set_nome(self, novo_nome):
                    self._nome = novo_nome
            
            p = Pessoa("Ana")
            print(p.get_nome())
            p.set_nome("Bruno")
            print(p.get_nome())
            
            ```
            
        - [POOE02] Altere a classe para usar propriedades (`@property` e `@setter`) no lugar dos métodos tradicionais para o atributo `nome`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome):
                    self._nome = nome
            
                @property
                def nome(self):
                    return self._nome
            
                @nome.setter
                def nome(self, novo_nome):
                    self._nome = novo_nome
            
            p = Pessoa("Ana")
            print(p.nome)
            p.nome = "Bruno"
            print(p.nome)
            
            ```
            
        - [POOE03] Crie uma classe `Conta` com atributo privado `_saldo` e métodos públicos para depósito e retirada que atualizem o saldo, sem permitir saldo negativo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Conta:
                def __init__(self):
                    self._saldo = 0
            
                def depositar(self, valor):
                    if valor > 0:
                        self._saldo += valor
            
                def sacar(self, valor):
                    if 0 < valor <= self._saldo:
                        self._saldo -= valor
                    else:
                        print("Saldo insuficiente ou valor inválido")
            
            c = Conta()
            c.depositar(500)
            c.sacar(200)
            print(c._saldo)
            c.sacar(400)  # saldo insuficiente
            
            ```
            
        - [POOE04] Na classe `Conta`, crie uma propriedade somente leitura `saldo` para acessar o saldo sem permitir alterações diretas.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Conta:
                def __init__(self):
                    self._saldo = 0
            
                def depositar(self, valor):
                    if valor > 0:
                        self._saldo += valor
            
                def sacar(self, valor):
                    if 0 < valor <= self._saldo:
                        self._saldo -= valor
                    else:
                        print("Saldo insuficiente ou valor inválido")
            
                @property
                def saldo(self):
                    return self._saldo
            
            c = Conta()
            c.depositar(500)
            c.sacar(200)
            print(c.saldo)
            
            ```
            
        - [POOE05] Crie uma classe `Funcionario` com atributo privado `_salario`. Faça um setter que só aceite valores positivos para salário.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Funcionario:
                def __init__(self, salario):
                    self._salario = salario
            
                @property
                def salario(self):
                    return self._salario
            
                @salario.setter
                def salario(self, valor):
                    if valor >= 0:
                        self._salario = valor
                    else:
                        print("Salário deve ser positivo")
            
            f = Funcionario(3000)
            print(f.salario)
            f.salario = -100  # inválido
            print(f.salario)
            f.salario = 3500
            print(f.salario)
            
            ```
            
        - [POOE06] Crie uma classe `Produto` com atributo privado `_preco` e crie um método para aplicar desconto, protegendo para que o preço nunca fique negativo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Produto:
                def __init__(self, preco):
                    self._preco = preco
            
                def aplicar_desconto(self, percentual):
                    desconto = self._preco * percentual / 100
                    novo_preco = self._preco - desconto
                    if novo_preco >= 0:
                        self._preco = novo_preco
                    else:
                        print("Desconto inválido")
            
                @property
                def preco(self):
                    return self._preco
            
            p = Produto(100)
            p.aplicar_desconto(10)
            print(p.preco)
            p.aplicar_desconto(100)  # inválido
            print(p.preco)
            
            ```
            
        - [POOE07] Crie uma classe `Carro` com atributo privado `_velocidade` e um método para acelerar, limitando a velocidade máxima a 200.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Carro:
                def __init__(self):
                    self._velocidade = 0
            
                def acelerar(self, incremento):
                    nova_velocidade = self._velocidade + incremento
                    if nova_velocidade <= 200:
                        self._velocidade = nova_velocidade
                    else:
                        self._velocidade = 200
            
                @property
                def velocidade(self):
                    return self._velocidade
            
            c = Carro()
            c.acelerar(50)
            print(c.velocidade)
            c.acelerar(180)
            print(c.velocidade)
            
            ```
            
        - [POOE08] Crie uma classe `Aluno` com atributo privado `_notas` (lista) e métodos para adicionar notas e calcular a média.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Aluno:
                def __init__(self):
                    self._notas = []
            
                def adicionar_nota(self, nota):
                    self._notas.append(nota)
            
                def media(self):
                    if self._notas:
                        return sum(self._notas) / len(self._notas)
                    else:
                        return 0
            
            a = Aluno()
            a.adicionar_nota(7)
            a.adicionar_nota(8)
            a.adicionar_nota(9)
            print(a.media())
            
            ```
            
        - [POOE09] Crie uma classe `Pessoa` que controle o acesso ao atributo privado `_idade`, com getter e setter que aceitem apenas idades entre 0 e 120.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, idade):
                    self._idade = idade
            
                @property
                def idade(self):
                    return self._idade
            
                @idade.setter
                def idade(self, valor):
                    if 0 <= valor <= 120:
                        self._idade = valor
                    else:
                        print("Idade inválida")
            
            p = Pessoa(30)
            print(p.idade)
            p.idade = 150  # inválido
            print(p.idade)
            p.idade = 40
            print(p.idade)
            
            ```
            
        - [POOE10] Implemente uma classe `ContaBancaria` com atributo privado `_senha`. Crie métodos para alterar a senha que só aceitem mudanças se a senha antiga for correta.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class ContaBancaria:
                def __init__(self, senha):
                    self._senha = senha
            
                def alterar_senha(self, senha_antiga, nova_senha):
                    if senha_antiga == self._senha:
                        self._senha = nova_senha
                        print("Senha alterada com sucesso")
                    else:
                        print("Senha antiga incorreta")
            
            conta = ContaBancaria("1234")
            conta.alterar_senha("0000", "5678")  # incorreto
            conta.alterar_senha("1234", "5678")  # correto
            
            ```
            
    
    <aside>
    8️⃣
    
    Exercícios de Fixação — Programação Orientada a Objetos — Herança
    
    </aside>
    
    - Lista de Exercícios
        - [POOH01] Crie uma classe `Animal` com um método `falar()` que imprima "Animal falando". Crie uma classe `Cachorro` que herde de `Animal` e sobrescreva `falar()` para imprimir "Au au!".
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Animal:
                def falar(self):
                    print("Animal falando")
            
            class Cachorro(Animal):
                def falar(self):
                    print("Au au!")
            
            a = Animal()
            a.falar()
            
            c = Cachorro()
            c.falar()
            
            ```
            
        - [POOH02] Crie uma classe `Veiculo` com atributos `marca` e `ano`. Crie uma classe `Carro` que herde de `Veiculo` e adicione um atributo `modelo`. Instancie e imprima todos os atributos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Veiculo:
                def __init__(self, marca, ano):
                    self.marca = marca
                    self.ano = ano
            
            class Carro(Veiculo):
                def __init__(self, marca, ano, modelo):
                    super().__init__(marca, ano)
                    self.modelo = modelo
            
            carro = Carro("Toyota", 2020, "Corolla")
            print(carro.marca, carro.ano, carro.modelo)
            
            ```
            
        - [POOH03] Crie uma classe base `Pessoa` com atributos `nome` e `idade`. Crie uma classe `Estudante` que herde de `Pessoa` e adicione o atributo `curso`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
            class Estudante(Pessoa):
                def __init__(self, nome, idade, curso):
                    super().__init__(nome, idade)
                    self.curso = curso
            
            est = Estudante("Maria", 22, "Engenharia")
            print(est.nome, est.idade, est.curso)
            
            ```
            
        - [POOH04] Em `Estudante`, sobrescreva um método `mostrar_dados()` para imprimir nome, idade e curso.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
                def mostrar_dados(self):
                    print(f"Nome: {self.nome}, Idade: {self.idade}")
            
            class Estudante(Pessoa):
                def __init__(self, nome, idade, curso):
                    super().__init__(nome, idade)
                    self.curso = curso
            
                def mostrar_dados(self):
                    print(f"Nome: {self.nome}, Idade: {self.idade}, Curso: {self.curso}")
            
            est = Estudante("Maria", 22, "Engenharia")
            est.mostrar_dados()
            
            ```
            
        - [POOH05] Crie uma classe `Funcionario` que herde de `Pessoa` e adicione atributo `salario`. Crie um método `aumentar_salario()`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
            
            class Funcionario(Pessoa):
                def __init__(self, nome, idade, salario):
                    super().__init__(nome, idade)
                    self.salario = salario
            
                def aumentar_salario(self, percentual):
                    self.salario += self.salario * percentual / 100
            
            f = Funcionario("João", 30, 3000)
            f.aumentar_salario(10)
            print(f.nome, f.salario)
            
            ```
            
        - [POOH06] Crie uma classe `Animal` com método `mover()`. Crie classes `Cachorro` e `Passaro` que herdem de `Animal` e sobrescrevam `mover()` com mensagens específicas.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Animal:
                def mover(self):
                    print("Animal está se movendo")
            
            class Cachorro(Animal):
                def mover(self):
                    print("O cachorro está correndo")
            
            class Passaro(Animal):
                def mover(self):
                    print("O pássaro está voando")
            
            c = Cachorro()
            p = Passaro()
            c.mover()
            p.mover()
            
            ```
            
        - [POOH07] Use `super()` para chamar o construtor da classe pai em uma classe `Gato` que herda de `Animal`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Animal:
                def __init__(self, nome):
                    self.nome = nome
            
            class Gato(Animal):
                def __init__(self, nome, cor):
                    super().__init__(nome)
                    self.cor = cor
            
            g = Gato("Mingau", "cinza")
            print(g.nome, g.cor)
            
            ```
            
        - [POOH08] Crie uma classe abstrata (usando `abc.ABC`) `Forma` com método abstrato `area()`. Crie classes `Quadrado` e `Circulo` que implementem `area()`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            from abc import ABC, abstractmethod
            import math
            
            class Forma(ABC):
                @abstractmethod
                def area(self):
                    pass
            
            class Quadrado(Forma):
                def __init__(self, lado):
                    self.lado = lado
            
                def area(self):
                    return self.lado * self.lado
            
            class Circulo(Forma):
                def __init__(self, raio):
                    self.raio = raio
            
                def area(self):
                    return math.pi * self.raio ** 2
            
            q = Quadrado(4)
            c = Circulo(3)
            print(q.area())
            print(c.area())
            
            ```
            
        - [POOH09] Crie uma classe `Veiculo` e uma classe `Barco`. Crie uma classe `Amphibio` que herde de `Veiculo` e `Barco`. Mostre como funciona herança múltipla.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Veiculo:
                def dirigir(self):
                    print("Dirigindo veículo")
            
            class Barco:
                def navegar(self):
                    print("Navegando barco")
            
            class Amphibio(Veiculo, Barco):
                pass
            
            a = Amphibio()
            a.dirigir()
            a.navegar()
            
            ```
            
        - [POOH10] Crie uma classe `Pessoa` com método `falar()`. Crie uma classe `Professor` que herda de `Pessoa` e chama o método `falar()` da superclasse dentro de seu próprio método sobrescrito.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def falar(self):
                    print("Pessoa falando")
            
            class Professor(Pessoa):
                def falar(self):
                    print("Professor iniciando fala")
                    super().falar()
                    print("Professor finalizando fala")
            
            prof = Professor()
            prof.falar()
            
            ```
            
    
    <aside>
    9️⃣
    
    Exercícios de Fixação — Programação Orientada a Objetos — Polimorfismo
    
    </aside>
    
    - Lista de Exercícios
        - [POOP01] Crie classes `Cachorro` e `Gato`, cada uma com método `fazer_som()` que imprime um som diferente.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Cachorro:
                def fazer_som(self):
                    print("Au au!")
            
            class Gato:
                def fazer_som(self):
                    print("Miau!")
            
            c = Cachorro()
            g = Gato()
            c.fazer_som()
            g.fazer_som()
            
            ```
            
        - [POOP02] Crie uma função `fazer_animais_falarem(animais)` que receba uma lista de objetos e chame `fazer_som()` em cada um.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def fazer_animais_falarem(animais):
                for animal in animais:
                    animal.fazer_som()
            
            animais = [Cachorro(), Gato()]
            fazer_animais_falarem(animais)
            
            ```
            
        - [POOP03] Crie classes `Funcionario` e `Gerente`, ambas com método `calcular_bonus()`, que retorna valores diferentes.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Funcionario:
                def calcular_bonus(self):
                    return 1000
            
            class Gerente(Funcionario):
                def calcular_bonus(self):
                    return 2000
            
            f = Funcionario()
            g = Gerente()
            print(f.calcular_bonus())
            print(g.calcular_bonus())
            
            ```
            
        - [POOP04] Crie uma lista com objetos `Funcionario` e `Gerente` e calcule o total de bônus usando polimorfismo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            funcionarios = [Funcionario(), Gerente(), Funcionario(), Gerente()]
            total_bonus = sum(f.calcular_bonus() for f in funcionarios)
            print(total_bonus)
            
            ```
            
        - [POOP05] Crie uma classe base `Forma` com método `area()` (que apenas retorna 0). Crie classes `Quadrado` e `Circulo` que sobrescrevam `area()`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            import math
            
            class Forma:
                def area(self):
                    return 0
            
            class Quadrado(Forma):
                def __init__(self, lado):
                    self.lado = lado
            
                def area(self):
                    return self.lado * self.lado
            
            class Circulo(Forma):
                def __init__(self, raio):
                    self.raio = raio
            
                def area(self):
                    return math.pi * self.raio ** 2
            
            q = Quadrado(4)
            c = Circulo(3)
            print(q.area())
            print(c.area())
            
            ```
            
        - [POOP06] Implemente um método `imprimir_area(form)` que recebe um objeto do tipo `Forma` e imprime sua área, usando polimorfismo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def imprimir_area(form):
                print(f"Área: {form.area()}")
            
            imprimir_area(Quadrado(5))
            imprimir_area(Circulo(2))
            
            ```
            
        - [POOP07] Crie classes `Passaro` e `Peixe`, ambas com método `mover()`. Mostre como o mesmo método pode ter comportamentos distintos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Passaro:
                def mover(self):
                    print("O pássaro está voando")
            
            class Peixe:
                def mover(self):
                    print("O peixe está nadando")
            
            p = Passaro()
            pe = Peixe()
            p.mover()
            pe.mover()
            
            ```
            
        - [POOP08] Crie uma interface (classe base com método abstrato) `Veiculo` com método `mover()`. Crie classes `Carro` e `Barco` que implementam `mover()`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            from abc import ABC, abstractmethod
            
            class Veiculo(ABC):
                @abstractmethod
                def mover(self):
                    pass
            
            class Carro(Veiculo):
                def mover(self):
                    print("Carro dirigindo")
            
            class Barco(Veiculo):
                def mover(self):
                    print("Barco navegando")
            
            c = Carro()
            b = Barco()
            c.mover()
            b.mover()
            
            ```
            
        - [POOP09] Implemente um sistema simples de pagamento com classes `CartaoCredito` e `Boleto`, ambas com método `pagar(valor)`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class CartaoCredito:
                def pagar(self, valor):
                    print(f"Pagando R$ {valor:.2f} no cartão de crédito")
            
            class Boleto:
                def pagar(self, valor):
                    print(f"Pagando R$ {valor:.2f} via boleto")
            
            cc = CartaoCredito()
            boleto = Boleto()
            cc.pagar(150)
            boleto.pagar(150)
            
            ```
            
        - [POOP10] Crie uma função que receba uma lista de objetos que implementem `pagar(valor)` e chame esse método para cada um, demonstrando polimorfismo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            def processar_pagamentos(pagadores, valor):
                for pagador in pagadores:
                    pagador.pagar(valor)
            
            pagadores = [CartaoCredito(), Boleto()]
            processar_pagamentos(pagadores, 200)
            
            ```
            
    
    <aside>
    🔟
    
    Exercícios de Fixação — Complementos
    
    </aside>
    
    - Lista de Exercícios
        - [PYCOMP01] Crie uma classe Livro com método **`__str__`** para retornar o título formatado.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Livro:
                def __init__(self, titulo):
                    self.titulo = titulo
            
                def __str__(self):
                    return f"Livro: {self.titulo}"
            
            l = Livro("Cem Anos de Solidão")
            print(l)
            
            ```
            
        - [PYCOMP02] Implemente a classe **`Ponto`** com **`__repr__`** que mostra coordenadas.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Ponto:
                def __init__(self, x, y):
                    self.x = x
                    self.y = y
            
                def __repr__(self):
                    return f"Ponto({self.x}, {self.y})"
            
            p = Ponto(3, 4)
            print(p)
            
            ```
            
        - [PYCOMP03] Crie uma classe **`Fracao`** que implemente **`__add__`** para somar frações.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            from math import gcd
            
            class Fracao:
                def __init__(self, numerador, denominador):
                    self.numerador = numerador
                    self.denominador = denominador
            
                def __add__(self, other):
                    num = self.numerador * other.denominador + other.numerador * self.denominador
                    den = self.denominador * other.denominador
                    mdc = gcd(num, den)
                    return Fracao(num // mdc, den // mdc)
            
                def __str__(self):
                    return f"{self.numerador}/{self.denominador}"
            
            f1 = Fracao(1, 2)
            f2 = Fracao(1, 3)
            print(f1 + f2)
            
            ```
            
        - [PYCOMP04] Implemente **`__len__`** em uma classe **`Palavra`** que retorna o tamanho da string.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Palavra:
                def __init__(self, texto):
                    self.texto = texto
            
                def __len__(self):
                    return len(self.texto)
            
            p = Palavra("Python")
            print(len(p))
            
            ```
            
        - [PYCOMP05] Crie uma classe **`Banco`** com método **`__getitem__`** para acessar contas por índice.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Banco:
                def __init__(self):
                    self.contas = ["Conta1", "Conta2", "Conta3"]
            
                def __getitem__(self, index):
                    return self.contas[index]
            
            b = Banco()
            print(b[0])
            print(b[2])
            
            ```
            
        - [PYCOMP06] Adicione **`__setitem__`** para modificar uma conta em **`Banco`**.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Banco:
                def __init__(self):
                    self.contas = ["Conta1", "Conta2", "Conta3"]
            
                def __getitem__(self, index):
                    return self.contas[index]
            
                def __setitem__(self, index, valor):
                    self.contas[index] = valor
            
            b = Banco()
            b[1] = "ContaNova"
            print(b.contas)
            
            ```
            
        - [PYCOMP07] Implemente **`__eq__`** em **`Pessoa`** para comparar pelo nome.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Pessoa:
                def __init__(self, nome):
                    self.nome = nome
            
                def __eq__(self, other):
                    if isinstance(other, Pessoa):
                        return self.nome == other.nome
                    return False
            
            p1 = Pessoa("Ana")
            p2 = Pessoa("Ana")
            p3 = Pessoa("Bruno")
            print(p1 == p2)  # True
            print(p1 == p3)  # False
            
            ```
            
        - [PYCOMP08] Crie uma classe **`Contador`** com **`__call__`** para incrementar contador.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Contador:
                def __init__(self):
                    self.count = 0
            
                def __call__(self):
                    self.count += 1
                    print(f"Contador: {self.count}")
            
            c = Contador()
            c()
            c()
            
            ```
            
        - [PYCOMP09] Implemente **`__iter__`** e **`__next__`** numa classe **`Contador`** que conta até 3.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Contador:
                def __init__(self):
                    self.atual = 0
            
                def __iter__(self):
                    return self
            
                def __next__(self):
                    if self.atual < 3:
                        self.atual += 1
                        return self.atual
                    else:
                        raise StopIteration
            
            c = Contador()
            for num in c:
                print(num)
            
            ```
            
        - [PYCOMP10] Crie uma classe **`Frase`** com **`__contains__`** para verificar palavra.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Frase:
                def __init__(self, texto):
                    self.texto = texto
            
                def __contains__(self, palavra):
                    return palavra in self.texto.split()
            
            f = Frase("Programar em Python é divertido")
            print("Python" in f)
            print("Java" in f)
            
            ```
            
        
        ---
        
        - [PYCOMP11] Crie uma classe `Matematica` com método estático `somar(a, b)` que retorna a soma.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Matematica:
                @staticmethod
                def somar(a, b):
                    return a + b
            
            print(Matematica.somar(3, 4))
            
            ```
            
        - [PYCOMP12] Adicione um método estático `multiplicar(a, b)` à classe `Matematica`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Matematica:
                @staticmethod
                def somar(a, b):
                    return a + b
            
                @staticmethod
                def multiplicar(a, b):
                    return a * b
            
            print(Matematica.multiplicar(3, 4))
            
            ```
            
        - [PYCOMP13] Crie uma classe `Conversor` com método estático para converter Celsius para Fahrenheit.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Conversor:
                @staticmethod
                def celsius_para_fahrenheit(c):
                    return (c * 9/5) + 32
            
            print(Conversor.celsius_para_fahrenheit(25))
            
            ```
            
        - [PYCOMP14] Adicione método estático para converter Fahrenheit para Celsius na mesma classe.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Conversor:
                @staticmethod
                def celsius_para_fahrenheit(c):
                    return (c * 9/5) + 32
            
                @staticmethod
                def fahrenheit_para_celsius(f):
                    return (f - 32) * 5/9
            
            print(Conversor.fahrenheit_para_celsius(77))
            
            ```
            
        - [PYCOMP15] Crie uma classe `Calculadora` com método estático que verifica se um número é par.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Calculadora:
                @staticmethod
                def eh_par(n):
                    return n % 2 == 0
            
            print(Calculadora.eh_par(4))
            print(Calculadora.eh_par(5))
            
            ```
            
        - [PYCOMP16] Crie um método estático que retorna o maior número entre três valores.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Calculadora:
                @staticmethod
                def maior(a, b, c):
                    return max(a, b, c)
            
            print(Calculadora.maior(3, 7, 5))
            
            ```
            
        - [PYCOMP17] Crie uma classe `Texto` com método estático que conta vogais em uma string.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Texto:
                @staticmethod
                def contar_vogais(texto):
                    vogais = "aeiouAEIOU"
                    return sum(1 for letra in texto if letra in vogais)
            
            print(Texto.contar_vogais("Programação"))
            
            ```
            
        - [PYCOMP18] Crie método estático que retorna a soma dos dígitos de um número inteiro.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Numero:
                @staticmethod
                def soma_digitos(n):
                    return sum(int(d) for d in str(abs(n)))
            
            print(Numero.soma_digitos(12345))
            
            ```
            
        - [PYCOMP19] Crie método estático que verifica se uma string é um palíndromo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class StringUtil:
                @staticmethod
                def eh_palindromo(s):
                    s = s.lower().replace(" ", "")
                    return s == s[::-1]
            
            print(StringUtil.eh_palindromo("arara"))
            print(StringUtil.eh_palindromo("python"))
            
            ```
            
        - [PYCOMP20] Crie uma classe `Validador` com método estático que verifica se um número é primo.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Validador:
                @staticmethod
                def eh_primo(n):
                    if n <= 1:
                        return False
                    for i in range(2, int(n ** 0.5) + 1):
                        if n % i == 0:
                            return False
                    return True
            
            print(Validador.eh_primo(7))
            print(Validador.eh_primo(10))
            
            ```
            
        
        ---
        
        - [PYCOMP21] Crie uma classe `Endereco` com atributos `rua` e `numero`. Crie uma classe `Pessoa` que contenha um objeto `Endereco`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Endereco:
                def __init__(self, rua, numero):
                    self.rua = rua
                    self.numero = numero
            
            class Pessoa:
                def __init__(self, nome, endereco):
                    self.nome = nome
                    self.endereco = endereco
            
            endereco = Endereco("Rua do Bambu", 123)
            p = Pessoa("Tadeu", endereco)
            print(p.nome)
            print(p.endereco.rua, p.endereco.numero)
            
            ```
            
        - [PYCOMP22] Na classe `Endereco`, crie um método `mostrar()` que exiba o endereço formatado. Utilize esse método dentro da classe `Pessoa`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Endereco:
                def __init__(self, rua, numero):
                    self.rua = rua
                    self.numero = numero
            
                def mostrar(self):
                    print(f"{self.rua}, {self.numero}")
            
            class Pessoa:
                def __init__(self, nome, endereco):
                    self.nome = nome
                    self.endereco = endereco
            
            end = Endereco("Rua do Bambu", 123)
            p = Pessoa("Tadeu", end)
            print(p.nome)
            p.endereco.mostrar()
            
            ```
            
        - [PYCOMP23] Crie uma classe `Motor` com atributo `potencia`. Crie uma classe `Carro` que tenha um objeto `Motor`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Motor:
                def __init__(self, potencia):
                    self.potencia = potencia
            
            class Carro:
                def __init__(self, modelo, motor):
                    self.modelo = modelo
                    self.motor = motor
            
            motor = Motor(150)
            carro = Carro("Sedan", motor)
            print(carro.modelo)
            print(carro.motor.potencia)
            
            ```
            
        - [PYCOMP24] Adicione um método `ligar_motor()` na classe `Carro` que chama o método `ligar()` do objeto `Motor`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Motor:
                def __init__(self, potencia):
                    self.potencia = potencia
            
                def ligar(self):
                    print("Motor ligado")
            
            class Carro:
                def __init__(self, modelo, motor):
                    self.modelo = modelo
                    self.motor = motor
            
                def ligar_motor(self):
                    self.motor.ligar()
            
            motor = Motor(150)
            carro = Carro("Sedan", motor)
            carro.ligar_motor()
            
            ```
            
        - [PYCOMP25] Crie uma classe `Departamento` e uma classe `Empresa`. A classe `Empresa` deve conter uma lista de objetos `Departamento`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Departamento:
                def __init__(self, nome):
                    self.nome = nome
            
            class Empresa:
                def __init__(self, nome):
                    self.nome = nome
                    self.departamentos = []
            
                def adicionar_departamento(self, departamento):
                    self.departamentos.append(departamento)
            
            empresa = Empresa("Tech")
            d1 = Departamento("TI")
            d2 = Departamento("RH")
            empresa.adicionar_departamento(d1)
            empresa.adicionar_departamento(d2)
            
            print(empresa.nome)
            for d in empresa.departamentos:
                print(d.nome)
            
            ```
            
        - [PYCOMP26] Adicione um método `listar_departamentos()` na classe `Empresa` para imprimir os nomes dos departamentos.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Empresa:
                def __init__(self, nome):
                    self.nome = nome
                    self.departamentos = []
            
                def adicionar_departamento(self, departamento):
                    self.departamentos.append(departamento)
            
                def listar_departamentos(self):
                    for d in self.departamentos:
                        print(d.nome)
            
            empresa = Empresa("Tech")
            empresa.adicionar_departamento(Departamento("TI"))
            empresa.adicionar_departamento(Departamento("RH"))
            empresa.listar_departamentos()
            
            ```
            
        - [PYCOMP27] Crie uma classe `Processador` com atributo `frequencia`. Crie uma classe `Computador` que contenha um objeto `Processador` e um método para mostrar a frequência.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Processador:
                def __init__(self, frequencia):
                    self.frequencia = frequencia
            
            class Computador:
                def __init__(self, marca, processador):
                    self.marca = marca
                    self.processador = processador
            
                def mostrar_frequencia(self):
                    print(f"Frequência do processador: {self.processador.frequencia} GHz")
            
            proc = Processador(3.5)
            comp = Computador("Dell", proc)
            comp.mostrar_frequencia()
            
            ```
            
        - [PYCOMP28] Crie uma classe `Aluno` que contenha objetos `Endereco` e `Curso`.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Endereco:
                def __init__(self, rua, numero):
                    self.rua = rua
                    self.numero = numero
            
            class Curso:
                def __init__(self, nome):
                    self.nome = nome
            
            class Aluno:
                def __init__(self, nome, endereco, curso):
                    self.nome = nome
                    self.endereco = endereco
                    self.curso = curso
            
            end = Endereco("Rua B", 456)
            curso = Curso("Matemática")
            aluno = Aluno("Carlos", end, curso)
            
            print(aluno.nome)
            print(aluno.endereco.rua, aluno.endereco.numero)
            print(aluno.curso.nome)
            
            ```
            
        - [PYCOMP29] Adicione um método na classe `Aluno` para mostrar todas as informações do aluno (nome, endereço e curso).
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Aluno:
                def __init__(self, nome, endereco, curso):
                    self.nome = nome
                    self.endereco = endereco
                    self.curso = curso
            
                def mostrar_informacoes(self):
                    print(f"Nome: {self.nome}")
                    print(f"Endereço: {self.endereco.rua}, {self.endereco.numero}")
                    print(f"Curso: {self.curso.nome}")
            
            aluno.mostrar_informacoes()
            
            ```
            
        - [PYCOMP30] Crie uma classe `Biblioteca` que contenha uma lista de objetos `Livro` e um método para listar todos os títulos dos livros.
            
            <aside>
            💡
            
            Solução Sugerida
            
            </aside>
            
            ```python
            class Livro:
                def __init__(self, titulo):
                    self.titulo = titulo
            
            class Biblioteca:
                def __init__(self):
                    self.livros = []
            
                def adicionar_livro(self, livro):
                    self.livros.append(livro)
            
                def listar_titulos(self):
                    for livro in self.livros:
                        print(livro.titulo)
            
            biblio = Biblioteca()
            biblio.adicionar_livro(Livro("Dom Quixote"))
            biblio.adicionar_livro(Livro("O Pequeno Príncipe"))
            biblio.listar_titulos()
            
            ```
            
- Projeto de Conclusão
    
    <aside>
    🏁
    
    Projeto de Conclusão
    
    </aside>
    
    ### Organizador de Biblioteca Pessoal
    
    Você foi contratado para desenvolver um programa que ajude a organizar livros, revistas, álbuns de música e outros itens pessoais. Esses itens devem ser agrupados por categorias, como suspense, romance, tecnologia, música, entre outras, que o próprio usuário pode escolher.
    
    ---
    
    ### O que o programa deve permitir
    
    - **Adicionar Itens**:
        
        O usuário poderá adicionar diferentes tipos de itens (como livros, revistas ou álbuns de música), informando:
        
        - Título
        - Autor ou artista
        - Categoria
        - Informações adicionais, dependendo do tipo de item (ex: número de páginas para livros, edição para revistas, ano de lançamento para álbuns).
    - **Listar Itens**:
        
        Exibir todos os itens cadastrados no sistema.
        
    - **Listar por Categoria**:
        
        Filtrar os itens por uma categoria específica.
        
        Exemplo: visualizar todos os livros de romance ou todos os álbuns de rock.
        
    - **Remover Itens**:
        
        Permitir que o usuário remova um item do sistema através do título.
        
    - **Menu de Navegação**:
        
        Criar um menu interativo que permita ao usuário escolher as opções de adicionar, listar, filtrar por categoria ou remover itens.
        
    - **Validação de Dados**:
        
        O sistema deve garantir que os campos obrigatórios foram preenchidos corretamente, como título, autor/artista e categoria. Além disso, é necessário garantir que os dados informados (como número de páginas, edição ou ano de lançamento) sejam do tipo adequado.
        
    
    ---
    
    ### Dicas de Estrutura e Implementação
    
    Pense o projeto de forma que:
    
    - Cada tipo de item (livro, revista, álbum) seja uma **variação** de um **item geral**.
    - Novos tipos de itens (como filmes ou jogos) possam ser adicionados no futuro de maneira simples, sem grandes alterações no código.
    - As informações de cada item fiquem protegidas e só possam ser acessadas ou alteradas por métodos apropriados, garantindo o **encapsulamento** dos dados.
    - O sistema deve ser fácil de estender, reutilizando as partes de código de maneira eficiente e evitando redundâncias.
    
    ---
    
    ### Organização do Projeto
    
    A estrutura do seu projeto deve ser organizada da seguinte forma:
    
    - **modelo.py**: Contém as classes que representam os dados (itens e categorias). Cada tipo de item será uma classe que herda de uma classe base `Item`, que contém os atributos comuns a todos os itens.
    - **repositorio.py**: Responsável por armazenar os dados. Ele deve manter uma lista ou outro tipo de coleção para armazenar os itens adicionados.
    - **servico.py**: Onde estarão as regras de negócio e as funções que manipulam os dados dos itens, como adicionar, listar, remover ou filtrar itens.
    - **aplicacao.py**: O ponto de entrada do sistema, que apresenta o menu interativo e permite a navegação entre as opções oferecidas ao usuário.
    
    ---
    
    ### Funcionalidades Adicionais
    
    - O sistema pode ser facilmente expandido para permitir a adição de novos tipos de itens, caso o usuário queira, como por exemplo: filmes, jogos ou podcasts.
    - O código deve ser modularizado para garantir flexibilidade e reutilização do código. As funcionalidades específicas (adicionar, listar, remover) ficam em módulos separados.
    - Para facilitar o uso, utilize **métodos especiais** e **propriedades** para garantir a integridade dos dados e facilitar a interação com os objetos.
    
    ---
    
    ### Exemplo de Estrutura de Código
    
    ```python
    # Exemplo de código seguindo a estrutura
    from modelo import Livro, Revista, AlbumMusica
    from repositorio import Repositorio
    from servico import Servico
    
    # Exemplo de menu interativo
    def menu():
        servico = Servico()
        while True:
            print("\n1. Adicionar item")
            print("2. Listar itens")
            print("3. Listar por categoria")
            print("4. Remover item")
            print("5. Sair")
    
            opcao = input("Escolha uma opção: ")
            if opcao == "1":
                tipo = input("Tipo de item (livro, revista, album): ").lower()
                titulo = input("Título: ")
                autor_artista = input("Autor ou artista: ")
                categoria = input("Categoria: ")
                # Adicionando logicamente conforme o tipo
                if tipo == "livro":
                    numero_paginas = int(input("Número de páginas: "))
                    servico.adicionar_item(tipo, titulo, autor_artista, categoria, numero_paginas)
                elif tipo == "revista":
                    edicao = input("Edição: ")
                    servico.adicionar_item(tipo, titulo, autor_artista, categoria, edicao)
                elif tipo == "album":
                    ano_lancamento = int(input("Ano de lançamento: "))
                    servico.adicionar_item(tipo, titulo, autor_artista, categoria, ano_lancamento)
                else:
                    print("Tipo de item inválido!")
    
            elif opcao == "2":
                servico.listar_itens()
    
            elif opcao == "3":
                categoria = input("Informe a categoria: ")
                servico.listar_por_categoria(categoria)
    
            elif opcao == "4":
                titulo = input("Informe o título do item a ser removido: ")
                servico.remover_item(titulo)
    
            elif opcao == "5":
                break
    
    if __name__ == "__main__":
        menu()
    
    ```