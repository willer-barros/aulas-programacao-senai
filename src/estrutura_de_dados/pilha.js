// Uma pilha é uma estrutura de dados que armazena elementos seguindo a regra LIFO (Last In, First Out), ou seja, o último a entrar é o primeiro a sair.  Ela funciona como uma pilha de objetos no mundo real (como livros ou pratos), onde só é possível adicionar ou remover itens do topo. 

// Principais funções de uma pilha:
// push(elemento) – adiciona um elemento no topo da pilha. 
// pop() – remove e retorna o elemento do topo da pilha. 
// peek() ou top() – retorna o elemento do topo sem removê-lo. 
// isEmpty() – verifica se a pilha está vazia. 
// size() – retorna o número de elementos na pilha (opcional, depende da implementação). 

class Pilha {
    constructor() {
        this.itens = []; // Armazena os elementos da pilha
    }

    // Adiciona um elemento no topo da pilha
    push(elemento) {
        this.itens.push(elemento);
    }

    // Remove e retorna o elemento do topo da pilha
    pop() {
        if (this.isEmpty()) {
            return "Pilha vazia";
        }
        return this.itens.pop();
    }

    // Retorna o elemento do topo sem remover
    peek() {
        if (this.isEmpty()) {
            return "Pilha vazia";
        }
        return this.itens[this.itens.length - 1];
    }

    // Verifica se a pilha está vazia
    isEmpty() {
        return this.itens.length === 0;
    }

    // Retorna o tamanho da pilha
    size() {
        return this.itens.length;
    }
}

// Exemplo de uso
const minhaPilha = new Pilha();

minhaPilha.push("Livro 1");
minhaPilha.push("Livro 2");
minhaPilha.push("Livro 3");

console.log(minhaPilha.peek()); // Saída: Livro 3
console.log(minhaPilha.pop());  // Saída: Livro 3
console.log(minhaPilha.size()); // Saída: 2   