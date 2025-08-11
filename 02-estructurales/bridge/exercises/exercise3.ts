/**
 *  Ejercicio 3 – Avanzado
    Escenario: Estás construyendo una aplicación de dibujo. Puedes tener distintas figuras 
    (Triángulo, Rectángulo, Círculo) y diferentes motores gráficos (Canvas2D, WebGL).

    Haz que las figuras puedan dibujarse usando cualquier motor gráfico sin crear combinaciones específicas.
    Objetivo: Usar el patrón Bridge con un dominio más visual y potencialmente más realista.
 * 
 */

interface GraphicEngine {
    use(): void;
}

class Canvas2D implements GraphicEngine {
    use(): void {
      console.log('Usando el motor Canvas 2D:');
    }
}

class WebGL implements GraphicEngine {
  use(): void {
    console.log('Usando el motor WebGL:');
  }
}

abstract class Shape {
  
}

