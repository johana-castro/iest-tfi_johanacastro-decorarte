# Harness de agentes — DecorArte

## Propósito
Definir cómo un agente de IA recibe contexto, limita el alcance, modifica el repositorio y demuestra que su resultado cumple los requisitos. El harness no es una autorización para ejecutar acciones remotas sin supervisión.

## Fuentes de contexto
1. `AGENTS.md`: reglas generales y orden de lectura.
2. `memory.md` / `MEMORY.md`: decisiones persistentes del proyecto.
3. `docs/CONSTITUCION.md`: principios comprobables.
4. `docs/IDENTIDAD-MARCA.md`: marca y tono.
5. `docs/10-SEGURIDAD.md`: límites de seguridad.
6. `specs/NNN-funcionalidad/`: fuente de verdad de la tarea actual.
7. Código y tests existentes: estado implementado.

## Ciclo de ejecución

```text
Pedido humano
    ↓
Identificar spec y leer contexto
    ↓
Clarificar ambigüedades (sin programar)
    ↓
Actualizar spec → plan → tareas
    ↓
Aprobación humana si cambia alcance/seguridad/datos
    ↓
Implementar una tarea pequeña
    ↓
Ejecutar tests y revisar diff
    ↓
Verificar RF/RNF y actualizar documentación
    ↓
Entregar resumen, evidencia y pendientes
```

## Límites de autonomía
- Puede leer archivos, proponer planes y ejecutar pruebas locales no destructivas.
- Debe pedir aprobación antes de instalar dependencias nuevas, ejecutar migraciones remotas, tocar Auth/Storage/RLS, desplegar, borrar datos, cambiar variables de producción o ejecutar comandos destructivos.
- No debe usar credenciales del proyecto en prompts, logs ni commits.
- No debe crear commits, métricas, screenshots, fichas o resultados de pruebas ficticios.
- Si el código y la spec se contradicen, detenerse y proponer cuál actualizar; no cambiar ambos silenciosamente.

## Política de salida
Cada tarea concluye con:
1. Qué se modificó y por qué.
2. Archivos afectados.
3. Comandos ejecutados y resultado real.
4. Requisitos verificados y evidencia.
5. Riesgos y pruebas pendientes.
6. Confirmación de que no se alteraron secretos ni datos reales.

## Recuperación
Ante error: detener, preservar el estado, leer el mensaje completo, aislar la causa, proponer la corrección mínima y volver a ejecutar las pruebas afectadas. No repetir comandos destructivos por ensayo/error.
