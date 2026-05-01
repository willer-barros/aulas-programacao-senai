#include <stdio.h>

int main(void) {
    char nome[50];  // Declara um array para armazenar o nome (até 49 caracteres + '\0')
    
    printf("Qual seu nome: ");
    scanf("%s", nome);  // Lê uma string e armazena em 'nome'
    
    printf("Olá, %s!\n", nome);
    
    return 0;
}   