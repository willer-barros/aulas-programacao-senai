// Uma fila é uma estrutura de dados que segue a regra FIFO (First In, First Out), ou seja, o primeiro a entrar é o primeiro a sair.  Funciona como uma fila do mundo real: quem chega primeiro é atendido primeiro. 

// Funções básicas de uma fila
// enqueue(elemento) – adiciona um elemento no final da fila. 
// dequeue() – remove e retorna o elemento do início da fila. 
// peek() ou front() – retorna o elemento do início sem removê-lo. 
// isEmpty() – verifica se a fila está vazia. 
// size() – retorna o número de elementos na fila. 
// Exemplo de código em JavaScript (Node.js)
class Fila {
    constructor() {
        this.itens = []; // Armazena os elementos da fila
    }

    // Adiciona um elemento no final da fila
    enqueue(elemento) {
        this.itens.push(elemento);
    }

    // Remove e retorna o primeiro elemento
    dequeue() {
        if (this.isEmpty()) {
            return "Fila vazia";
        }
        return this.itens.shift();
    }

    // Retorna o primeiro elemento sem remover
    peek() {
        if (this.isEmpty()) {
            return "Fila vazia";
        }
        return this.itens[0];
    }

    // Verifica se a fila está vazia
    isEmpty() {
        return this.itens.length === 0;
    }

    // Retorna o tamanho da fila
    size() {
        return this.itens.length;
    }
}

// Exemplo de uso
const minhaFila = new Fila();

minhaFila.enqueue("Ana");
minhaFila.enqueue("Bruno");
minhaFila.enqueue("Carlos");

console.log(minhaFila.peek());   // Saída: Ana
console.log(minhaFila.dequeue()); // Saída: Ana
console.log(minhaFila.size());   // Saída: 2