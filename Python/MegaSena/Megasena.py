import random
import math
import time

linha = '-'*75
titulo = 'Gerador Mega-Sena'
resp = "S"
print(linha)
print(titulo.center(75, '*').upper())
print(linha)
print('\n')


def megasena():
    N = int(input("Digite a Quantidade de jogos!\n"))
    print("\n")
    contador = 0
    inicio = time.time()
    while (contador < N):
        jogo = random.sample(range(1, 61), 6)
        jogo.sort()
        # while (jogo[0] == 0):
        #     jogo = random.sample(range(60), 6)
        #     jogo.sort()
        print('========================')
        print('Jogo numero:', contador+1)
        print('========================')
        print('\n')
        print(jogo)
        contador += 1
        print("\n")
    fim = time.time()
    print(fim - inicio)
    resp = str.upper(input("\nDesenja gerar novos jogos? (S/N)\n"))


print(resp)
while (resp == "S"):
    if(resp == "S"):
        megasena()
    else:
        exit()
