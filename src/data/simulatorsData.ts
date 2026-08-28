import { 
  AttentionSentence, 
  ClozeStep, 
  ReasoningExample, 
  TokenSample,
  TransformerLayerInfo,
  WeightSimulationFeature,
  ModelCategoryComparison,
  DeviceComparisonScenario,
  LiquidModelArchitecturePoint
} from '../types';

export const TOKEN_SAMPLES: TokenSample[] = [
  {
    text: "The internationalization of English language teaching is unbelievable.",
    tokens: [
      { token: "The", id: 464, type: 'word', linguisticNote: 'Artículo definido común (1 token completo)' },
      { token: " international", id: 7531, type: 'subword-root', linguisticNote: 'Raíz adjetival común' },
      { token: "ization", id: 3419, type: 'subword-affix', linguisticNote: 'Sufijo nominalizador derivacional (-ization: proceso)' },
      { token: " of", id: 286, type: 'word', linguisticNote: 'Preposición frecuente' },
      { token: " English", id: 3594, type: 'word', linguisticNote: 'Nombre propio / lengua (1 token)' },
      { token: " language", id: 3303, type: 'word', linguisticNote: 'Sustantivo estándar' },
      { token: " teaching", id: 8206, type: 'word', linguisticNote: 'Gerundio / sustantivo verbal' },
      { token: " is", id: 318, type: 'word', linguisticNote: 'Verbo cópula en 3ra persona' },
      { token: " un", id: 734, type: 'subword-affix', linguisticNote: 'Prefijo negativo morfológico (un-)' },
      { token: "believ", id: 18942, type: 'subword-root', linguisticNote: 'Raíz léxica del verbo believe' },
      { token: "able", id: 492, type: 'subword-affix', linguisticNote: 'Sufijo adjetival de capacidad (-able)' },
      { token: ".", id: 13, type: 'punct', linguisticNote: 'Signo de puntuación delimitador' },
    ],
    explanation: 'Observe cómo "unbelievable" se descompone en 3 tokens morfológicos: el prefijo "un-", la raíz "believ" y el sufijo "-able". En inglés, esto permite inferir el significado combinatorio exactamente como enseña un profesor de fonética y morfología.'
  },
  {
    text: "Teachers are scaffolding students' reading comprehension effortlessly.",
    tokens: [
      { token: "Teachers", id: 16742, type: 'word', linguisticNote: 'Sustantivo plural (profesores)' },
      { token: " are", id: 389, type: 'word', linguisticNote: 'Auxiliar del presente continuo' },
      { token: " scaff", id: 39820, type: 'subword-root', linguisticNote: 'Subpalabra inicial del término andamiaje' },
      { token: "olding", id: 11204, type: 'subword-affix', linguisticNote: 'Sufijo continuo morfológico' },
      { token: " students", id: 2470, type: 'word', linguisticNote: 'Sustantivo plural' },
      { token: "'", id: 6, type: 'punct', linguisticNote: 'Marca de genitivo posesivo sajón plural' },
      { token: " reading", id: 3450, type: 'word', linguisticNote: 'Destreza de lectura (Receptive skill)' },
      { token: " comprehension", id: 19803, type: 'word', linguisticNote: 'Sustantivo abstracto de comprensión' },
      { token: " effort", id: 5930, type: 'subword-root', linguisticNote: 'Raíz sustantiva (esfuerzo)' },
      { token: "lessly", id: 8941, type: 'subword-affix', linguisticNote: 'Doble sufijo: privativo (-less) + adverbial (-ly)' },
      { token: ".", id: 13, type: 'punct', linguisticNote: 'Punto final' }
    ],
    explanation: 'El término técnico pedagógico "scaffolding" se fragmenta en "scaff" + "olding", y el adverbio "effortlessly" en "effort" + "lessly". Esto demuestra que el modelo nunca "se queda sin vocabulario" ante terminología especializada.'
  },
  {
    text: "I went to the bank to deposit my paycheck.",
    tokens: [
      { token: "I", id: 40, type: 'word', linguisticNote: 'Pronombre sujeto 1ra persona' },
      { token: " went", id: 1816, type: 'word', linguisticNote: 'Pasado simple del verbo irregular "go"' },
      { token: " to", id: 284, type: 'word', linguisticNote: 'Preposición de dirección' },
      { token: " the", id: 262, type: 'word', linguisticNote: 'Artículo definido' },
      { token: " bank", id: 3046, type: 'word', linguisticNote: 'Palabra polisémica (institución financiera vs orilla)' },
      { token: " to", id: 284, type: 'word', linguisticNote: 'Marcador de infinitivo de propósito' },
      { token: " deposit", id: 14758, type: 'word', linguisticNote: 'Verbo de acción financiera que desambigua "bank"' },
      { token: " my", id: 616, type: 'word', linguisticNote: 'Adjetivo posesivo' },
      { token: " pay", id: 1430, type: 'subword-root', linguisticNote: 'Morfema raíz (pago)' },
      { token: "check", id: 2850, type: 'subword-root', linguisticNote: 'Palabra compuesta (cheque de nómina)' },
      { token: ".", id: 13, type: 'punct', linguisticNote: 'Puntuación' }
    ],
    explanation: 'En esta oración polisémica, los tokens son en su mayoría palabras completas, pero "paycheck" se divide en las dos raíces del compuesto "pay" + "check".'
  }
];

export const CLOZE_STEPS: ClozeStep[] = [
  {
    context: "After studying irregular verbs all morning, the exhausted English student decided to drink a cup of hot",
    blankMeaning: 'Bebida caliente de consumo habitual en pausas de estudio',
    targetExpected: 'coffee / tea',
    candidates: [
      { token: " coffee", logit: 9.8, meaning: 'Café (colocación típica de estudio en Costa Rica / LatAm)', grammaticalRole: 'Sustantivo incontable' },
      { token: " tea", logit: 8.6, meaning: 'Té (colocación británica/académica tradicional)', grammaticalRole: 'Sustantivo incontable' },
      { token: " chocolate", logit: 6.4, meaning: 'Chocolate caliente', grammaticalRole: 'Sustantivo' },
      { token: " water", logit: 4.1, meaning: 'Agua (menos común con "hot cup of")', grammaticalRole: 'Sustantivo' },
      { token: " soup", logit: 2.3, meaning: 'Sopa (semánticamente posible pero pragmáticamente rara)', grammaticalRole: 'Sustantivo' },
      { token: " grammar", logit: -4.5, meaning: 'Gramática (error de categoría semántica)', grammaticalRole: 'Sustantivo abstracto' },
    ]
  },
  {
    context: "If the teacher had explained the grammar rule more clearly, the students would have",
    blankMeaning: 'Verbo en participio pasado (Third Conditional - estructura gramatical)',
    targetExpected: 'understood / passed / scored',
    candidates: [
      { token: " understood", logit: 10.2, meaning: 'Comprendido (concordancia semántica y del 3er condicional)', grammaticalRole: 'Participio pasado' },
      { token: " passed", logit: 9.1, meaning: 'Aprobado el examen', grammaticalRole: 'Participio pasado' },
      { token: " learned", logit: 7.8, meaning: 'Aprendido la lección', grammaticalRole: 'Participio pasado' },
      { token: " asked", logit: 5.2, meaning: 'Preguntado dudas', grammaticalRole: 'Participio pasado' },
      { token: " understand", logit: -2.1, meaning: 'Error morfosintáctico (infinitivo tras would have)', grammaticalRole: 'Forma base incorrecta' },
      { token: " banana", logit: -9.8, meaning: 'Disparate semántico total', grammaticalRole: 'Sustantivo ajeno' },
    ]
  },
  {
    context: "In Costa Rican high schools, learning English opens doors to international",
    blankMeaning: 'Oportunidades laborales y de desarrollo profesional',
    targetExpected: 'opportunities / careers',
    candidates: [
      { token: " opportunities", logit: 10.5, meaning: 'Oportunidades (colocación fija "open doors to opportunities")', grammaticalRole: 'Sustantivo plural' },
      { token: " careers", logit: 8.4, meaning: 'Carreras profesionales', grammaticalRole: 'Sustantivo plural' },
      { token: " companies", logit: 7.1, meaning: 'Empresas multinacionales', grammaticalRole: 'Sustantivo plural' },
      { token: " tourism", logit: 6.8, meaning: 'Turismo (contexto costarricense)', grammaticalRole: 'Sustantivo' },
      { token: " doors", logit: 1.2, meaning: 'Redundancia léxica indeseada', grammaticalRole: 'Sustantivo repetido' },
    ]
  }
];

export const ATTENTION_SENTENCES: AttentionSentence[] = [
  {
    id: 'bank-polysemy',
    text: "I went to the bank to deposit money because my account was empty.",
    tokens: ["I", "went", "to", "the", "bank", "to", "deposit", "money", "because", "my", "account", "was", "empty", "."],
    explanation: 'Haga clic en la palabra "bank" (token #4) para ver cómo el mecanismo de atención asigna pesos masivos a "deposit", "money" y "account", resolviendo instantáneamente que es un banco financiero y no una orilla de río.',
    attentionWeights: {
      4: [0.02, 0.04, 0.01, 0.03, 0.15, 0.02, 0.32, 0.25, 0.01, 0.02, 0.11, 0.01, 0.01, 0.0],
      6: [0.01, 0.03, 0.01, 0.02, 0.28, 0.05, 0.20, 0.35, 0.01, 0.01, 0.02, 0.01, 0.0, 0.0],
      10: [0.01, 0.02, 0.01, 0.02, 0.29, 0.01, 0.22, 0.18, 0.02, 0.05, 0.12, 0.02, 0.03, 0.0],
      12: [0.01, 0.01, 0.01, 0.01, 0.08, 0.01, 0.05, 0.10, 0.05, 0.08, 0.45, 0.10, 0.04, 0.0]
    },
    pedagogicalInsight: 'En la enseñanza del inglés (ELT), esto demuestra la "Teoría de Esquemas" y la "Cohesión Léxica" de Halliday & Hasan. Las palabras no tienen significado aislado sino por sus colocaciones en el texto.'
  },
  {
    id: 'anaphora-pronoun',
    text: "The trophy could not fit into the brown suitcase because it was too large.",
    tokens: ["The", "trophy", "could", "not", "fit", "into", "the", "brown", "suitcase", "because", "it", "was", "too", "large", "."],
    explanation: 'Haga clic en el pronombre "it" (token #10). El mecanismo de atención conecta "it" con "trophy" (70%) y no con "suitcase" (12%), deduciendo la referencia física correcta.',
    attentionWeights: {
      10: [0.02, 0.48, 0.02, 0.01, 0.06, 0.02, 0.01, 0.02, 0.12, 0.03, 0.05, 0.02, 0.04, 0.10, 0.0],
      13: [0.01, 0.38, 0.01, 0.02, 0.15, 0.02, 0.01, 0.02, 0.09, 0.02, 0.18, 0.04, 0.05, 0.0, 0.0],
      8: [0.02, 0.05, 0.02, 0.01, 0.22, 0.15, 0.12, 0.28, 0.08, 0.01, 0.02, 0.01, 0.01, 0.0, 0.0]
    },
    pedagogicalInsight: 'Este es el famoso "Winograd Schema". En ELT, enseñamos a los estudiantes a resolver referentes anafóricos usando el sentido común y la gramática del contexto.'
  },
  {
    id: 'subject-verb-agreement',
    text: "The passionate teacher who loved modern technologies inspires all her students daily.",
    tokens: ["The", "passionate", "teacher", "who", "loved", "modern", "technologies", "inspires", "all", "her", "students", "daily", "."],
    explanation: 'Haga clic en el verbo "inspires" (token #7). A pesar de que la palabra inmediata anterior es "technologies" (plural), la cabeza de atención sintáctica se fija en "teacher" (singular) para mantener la concordancia sujeto-verbo en 3ra persona.',
    attentionWeights: {
      7: [0.02, 0.05, 0.52, 0.04, 0.03, 0.01, 0.04, 0.12, 0.02, 0.04, 0.10, 0.01, 0.0],
      2: [0.12, 0.25, 0.10, 0.10, 0.08, 0.02, 0.02, 0.15, 0.02, 0.05, 0.08, 0.01, 0.0],
    },
    pedagogicalInsight: 'Excelente ejemplo para docentes sobre cláusulas relativas restrictivas: cómo no dejarse confundir por el sustantivo adyacente del modificador.'
  }
];

export const REASONING_EXAMPLES: ReasoningExample[] = [
  {
    id: 'grammar-error-analysis',
    title: 'Detección y Corrección de Error Gramatical (Conditional Types)',
    prompt: 'Analyze this student sentence: "If I would have known the answer, I would tell you yesterday." Is it correct? If not, provide the rule and correction.',
    targetCategory: 'Grammar Pedagogy (Third Conditional vs Mixed)',
    verifierCriteria: 'Regla del 3er Condicional aplicada correctamente: If + Past Perfect, would have + Past Participle.',
    finalVerdict: 'verified',
    rewardScore: 1.0,
    eltLessonConnection: 'Estrategia de Auto-Monitoreo (Krashen\'s Monitor Hypothesis) y protocolos Think-Aloud para producción escrita.',
    traces: [
      {
        stepNumber: 1,
        type: 'think',
        content: 'Reading the student sentence carefully: "If I would have known the answer, I would tell you yesterday."',
        subAnalysis: 'Identificación de cláusula IF y cláusula principal. Adverbio temporal: "yesterday" (tiempo pasado cerrado).'
      },
      {
        stepNumber: 2,
        type: 'reflect',
        content: 'Wait! Look at the IF clause: "If I would have known". In standard English grammar, we do not use "would" inside the if-clause for past counterfactual conditionals. It should be Past Perfect: "If I had known".',
        subAnalysis: 'Detección de sobre-generalización común en aprendices de L2 (trasladar el auxiliar modal "would" a la condición).',
        isSelfCorrection: true
      },
      {
        stepNumber: 3,
        type: 'reflect',
        content: 'Now let\'s check the main clause: "I would tell you yesterday". Because of the temporal marker "yesterday", this is an unfulfilled past action. Therefore, it requires "would have told" (Third Conditional) rather than "would tell" (Second Conditional).',
        subAnalysis: 'Verificación de concordancia temporal en la consecuencia del condicional.',
        isSelfCorrection: true
      },
      {
        stepNumber: 4,
        type: 'verify',
        content: 'Verifier Check: Structure is Third Conditional: If + had + V3, would have + V3. Correction: "If I had known the answer, I would have told you yesterday." Matches standard CEFR B1/B2 descriptors for INA language programs.',
        subAnalysis: 'Comprobación determinista con la clave de reglas gramaticales.'
      },
      {
        stepNumber: 5,
        type: 'output',
        content: 'The sentence is incorrect. In English Third Conditional, avoid "would" in the IF-clause and use Past Perfect ("If I had known"). In the result clause, use "would have + past participle" for past events ("would have told"). Corrected sentence: "If I had known the answer, I would have told you yesterday."',
        subAnalysis: 'Respuesta final estructurada y pedagógicamente clara para el estudiante.'
      }
    ]
  },
  {
    id: 'collocation-nuance',
    title: 'Selección de Colocación Léxica Natural (Make vs Do)',
    prompt: 'A student wrote: "I always do a lot of mistakes when I speak in English." Explain why it sounds unnatural.',
    targetCategory: 'Lexical Chunks & Collocations (Michael Lewis)',
    verifierCriteria: 'Explicación del par colocacional fijo "make mistakes" vs "do homework/tasks".',
    finalVerdict: 'verified',
    rewardScore: 1.0,
    eltLessonConnection: 'Enfoque Léxico (Lexical Approach): enseñar bloques prefabricados (chunks) en lugar de palabras aisladas.',
    traces: [
      {
        stepNumber: 1,
        type: 'think',
        content: 'Examining the phrase "do a lot of mistakes". In Spanish, "hacer" translates to both "make" and "do", which leads to L1 interference (Spanish: "hacer errores").',
        subAnalysis: 'Diagnóstico del error por transferencia de la lengua materna (L1 Negative Transfer).'
      },
      {
        stepNumber: 2,
        type: 'reflect',
        content: 'Let me double-check the collocation taxonomy: "Do" is generally used for duties, jobs, repetitive tasks (do homework, do dishes, do research). "Make" is used for creating, producing, constructing, or communicative outcomes (make a mistake, make an effort, make a decision).',
        subAnalysis: 'Contrastación léxica de campos semánticos de acción vs creación.'
      },
      {
        stepNumber: 3,
        type: 'verify',
        content: 'Verifier confirmation: The collocation "make mistakes" has an overwhelmingly high frequency in native corpora (COCA / BNC). Using "do mistakes" is marked as an unidiomatic error in CEFR A2/B1 rubrics.',
        subAnalysis: 'Validación con corpus lingüístico de referencia.'
      },
      {
        stepNumber: 4,
        type: 'output',
        content: 'In English, "mistake" collocates exclusively with the verb "make", not "do". While in Spanish we say "hacer errores", English uses "make a mistake". Correct version: "I always make a lot of mistakes when I speak in English." Remember: We DO homework, but we MAKE mistakes!',
        subAnalysis: 'Regla mnemotécnica pedagógica lista para usar en el aula.'
      }
    ]
  }
];

// ==========================================
// 1. TRANSFORMER ARCHITECTURE PIPELINE STAGES
// ==========================================
export const TRANSFORMER_PIPELINE_STAGES: TransformerLayerInfo[] = [
  {
    id: 'stage-embeddings',
    stepNumber: 1,
    name: 'Embeddings de Token & Codificación Posicional (RoPE)',
    mathFormula: 'x_i = W_e [t_i] + PE(pos_i)',
    technicalRole: 'Transforma IDs de tokens discretos en vectores densos continuos en un espacio de dimensión d_model (ej. 4096 dim). Inyecta la posición relativa en el texto.',
    eltPedagogyParallel: 'Diccionario Mental & Orden de Palabras en Inglés: Cada palabra tiene un "vector de rasgos semánticos" (humano, acción, formalidad) y una etiqueta sintáctica de posición en la oración (S-V-O).',
    inputShape: '[Batch, Seq_Len] (IDs enteros)',
    outputShape: '[Batch, Seq_Len, d_model] (Vectores continuos)',
    keyParameters: 'Matriz W_embed ∈ ℝ^{|V| × d_model} (ej. 128,000 × 4096 ≈ 524M pesos)',
    interactiveNote: 'Sin esta capa, las palabras serían solo códigos sin relación semántica (ej. "dog" y "cat" estarían tan distantes como "dog" y "refrigerator").'
  },
  {
    id: 'stage-attention',
    stepNumber: 2,
    name: 'Multi-Head Self-Attention (Q, K, V)',
    mathFormula: 'MHA(X) = Concat(head_1, ..., head_h) W_O \nhead_i = Softmax((X W_Q^i)(X W_K^i)^T / √d_k + M) (X W_V^i)',
    technicalRole: 'Calcula cómo cada token debe actualizar su significado en función de todos los demás tokens del contexto previo. Múltiples cabezas atienden a sintaxis, concordancia y semántica en paralelo.',
    eltPedagogyParallel: 'Lectura Comprensiva & Cohesión Textual: Una cabeza de atención rastrea concordancia sujeto-verbo ("She" → "reads"), otra resuelve pronombres ("it" → "the car"), y otra analiza colocaciones ("heavy" → "rain").',
    inputShape: '[Batch, Seq_Len, d_model]',
    outputShape: '[Batch, Seq_Len, d_model]',
    keyParameters: 'Matrices W_Q, W_K, W_V, W_O (4 × d_model² ≈ 67M pesos por capa)',
    interactiveNote: 'La máscara causal M asegura que el modelo no "haga trampa" mirando palabras del futuro durante el entrenamiento.'
  },
  {
    id: 'stage-addnorm-1',
    stepNumber: 3,
    name: 'Conexión Residual & Normalización (Add & RMSNorm)',
    mathFormula: 'X_{mid} = RMSNorm(X + MHA(X)) \nRMSNorm(z) = γ ⊙ (z / RMS(z))',
    technicalRole: 'La conexión residual suma la entrada original X a la salida de atención. La normalización evita que los valores numéricos exploten o desaparezcan a lo largo de 80 capas.',
    eltPedagogyParallel: 'Andamiaje Cognitivo Acumulativo: El estudiante no olvida el significado original de la palabra base mientras añade capas de análisis gramatical.',
    inputShape: '[Batch, Seq_Len, d_model]',
    outputShape: '[Batch, Seq_Len, d_model]',
    keyParameters: 'Escalares de ganancia γ ∈ ℝ^{d_model} (4,096 parámetros)',
    interactiveNote: 'Permite que el gradiente fluya directamente hacia atrás durante el entrenamiento sin desvanecerse (Vanishing Gradient).'
  },
  {
    id: 'stage-ffn',
    stepNumber: 4,
    name: 'Red Neuronal Feed-Forward (MLP / SwiGLU)',
    mathFormula: 'FFN(X) = (Swish(X W_{gate}) ⊙ (X W_{up})) W_{down} + b',
    technicalRole: 'La "memoria asociativa" del modelo donde se almacenan hechos fácticos, patrones léxicos complejos y transformaciones no lineales profundas. Suele expandirse a 8/3 × d_model (ej. 14,336 dimensiones).',
    eltPedagogyParallel: 'Memoria a Largo Plazo & Reglas Gramaticales Asimiladas: Tras relacionar las palabras (Atención), la red procesa y consolida el conocimiento léxico-semántico en sus neuronas.',
    inputShape: '[Batch, Seq_Len, d_model]',
    outputShape: '[Batch, Seq_Len, d_model]',
    keyParameters: 'W_gate, W_up, W_down (3 × d_model × d_ffn ≈ 176M pesos por capa)',
    interactiveNote: 'Constituye ~65% de los parámetros totales de cada bloque Transformer.'
  },
  {
    id: 'stage-stack',
    stepNumber: 5,
    name: 'Apilamiento Profundo de Capas (Layers L = 32 a 80)',
    mathFormula: 'X^{(l)} = TransformerBlock_l(X^{(l-1)}) \npara l = 1, 2, ..., L',
    technicalRole: 'El procesamiento se repite en cascada. Las capas tempranas analizan morfología y gramática básica; las capas intermedias procesan sintaxis y colocaciones; las capas profundas sintetizan razonamiento, estilo y pragmática.',
    eltPedagogyParallel: 'Taxonomía de Bloom Lingüística: Capas 1-8 (Recordar/Identificar morfemas), Capas 9-20 (Comprender y relacionar cláusulas), Capas 21-32 (Sintetizar, argumentar y evaluar el tono discursivo).',
    inputShape: '[Batch, Seq_Len, d_model]',
    outputShape: '[Batch, Seq_Len, d_model]',
    keyParameters: 'L × (Parámetros por Bloque). En un modelo de 8B parámetros hay 32 capas.',
    interactiveNote: 'Cada capa refina y enriquece el vector de cada palabra en su contexto.'
  },
  {
    id: 'stage-unembedding',
    stepNumber: 6,
    name: 'Proyección Final & Función Softmax (Next-Token Head)',
    mathFormula: 'Logits = RMSNorm(X^{(L)}) W_{unembed}^T \nP(x_{next} = v) = \\frac{e^{Logits_v / \\tau}}{\\sum_{j=1}^{|V|} e^{Logits_j / \\tau}}',
    technicalRole: 'Transforma el vector latente final de vuelta al tamaño del vocabulario (|V| = 128,000 probabilidades) para seleccionar la palabra siguiente.',
    eltPedagogyParallel: 'Producción Oral/Escrita Final (Output): El cerebro del estudiante, tras todo el análisis mental, decide la palabra exacta que pronuncia o escribe.',
    inputShape: '[Batch, Seq_Len, d_model]',
    outputShape: '[Batch, Seq_Len, |V|] (Distribución de probabilidades)',
    keyParameters: 'W_unembed ∈ ℝ^{|V| × d_model} (comparte o duplica los 524M pesos del embedding inicial)',
    interactiveNote: 'El parámetro de temperatura τ calibra si la selección es determinista o creativa.'
  }
];

// ==========================================
// 2. NEURAL NETWORK WEIGHT SIMULATOR PRESETS
// ==========================================
export interface NeuralWeightPreset {
  id: string;
  name: string;
  linguisticGoal: string;
  eltCurriculumConcept: string;
  targetCategory: string;
  bias: number;
  features: WeightSimulationFeature[];
  explanation: string;
}

export const NEURAL_WEIGHT_PRESETS: NeuralWeightPreset[] = [
  {
    id: 'past-tense',
    name: 'Clasificador Neuronal de Tiempo Pasado (Past Tense)',
    linguisticGoal: 'Determinar si un verbo u oración pertenece al Pasado Simple (Past Simple Tense)',
    eltCurriculumConcept: 'Morfología flexiva (-ed) y verbos irregulares comunes (A2)',
    targetCategory: 'Past Tense Detected (Logit > 0)',
    bias: -1.2,
    features: [
      { id: 'f1', label: 'Terminación regular "-ed" (ej. walked, played)', description: 'Morfema sufijal típico de pasado regular', inputValue: 1.0, weight: 2.8 },
      { id: 'f2', label: 'Raíz irregular de pasado (ej. went, saw, bought)', description: 'Palabra en lista de verbos irregulares', inputValue: 0.0, weight: 3.2 },
      { id: 'f3', label: 'Marcador temporal pasado (yesterday, last night, in 2020)', description: 'Adverbio temporal que fuerza contexto pasado', inputValue: 1.0, weight: 1.9 },
      { id: 'f4', label: 'Auxiliar de presente ("does", "is", "have")', description: 'Incompatible con pasado simple directo (inhibidor)', inputValue: 0.0, weight: -3.5 },
    ],
    explanation: 'En una red neuronal, los "pesos positivos" (W > 0) refuerzan la activación de la neurona ante pistas como "-ed" o "yesterday", mientras que los "pesos negativos" (W < 0) inhiben fuertemente la neurona si aparece un auxiliar de presente ("is", "does"). Así es exactamente como los modelos aprenden reglas gramaticales.'
  },
  {
    id: 'subject-verb',
    name: 'Detector de Error en 3ra Persona Singular (Subject-Verb Agreement)',
    linguisticGoal: 'Detectar si falta la "-s" en 3ra persona singular de Presente Simple ("He work" vs "He works")',
    eltCurriculumConcept: 'Concordancia Sujeto-Verbo en Presente Simple (A1-A2)',
    targetCategory: 'Error de Concordancia Detectado (Logit > 0)',
    bias: -0.8,
    features: [
      { id: 'f1', label: 'Sujeto es 3ra persona singular ("he", "she", "it", "the teacher")', description: 'Pronombre o sustantivo singular', inputValue: 1.0, weight: 2.5 },
      { id: 'f2', label: 'Verbo carece de sufijo "-s" / "-es" (ej. "go", "play", "teach")', description: 'Forma base sin flexión de 3ra persona', inputValue: 1.0, weight: 3.1 },
      { id: 'f3', label: 'Presencia de verbo modal ("can", "must", "should")', description: 'Los modales anulan la regla de la "-s" (falso positivo)', inputValue: 0.0, weight: -4.0 },
      { id: 'f4', label: 'Tiempo verbal es Pasado Simple ("went", "visited")', description: 'El pasado no lleva -s en 3ra persona (inhibidor)', inputValue: 0.0, weight: -3.8 },
    ],
    explanation: 'Observe cómo el peso del verbo modal ("can", "should") tiene un valor fuertemente negativo (-4.0). Si el estudiante dice "She can sing", la presencia del modal "can" apaga la alarma de error aunque el verbo "sing" no tenga "-s".'
  },
  {
    id: 'academic-register',
    name: 'Detector de Registro Académico Formal vs Informal',
    linguisticGoal: 'Evaluar si un párrafo de ensayo en inglés tiene un registro formal adecuado para pruebas B2/C1',
    eltCurriculumConcept: 'Registro Léxico & Conectores Discursivos Formales (B2/C1)',
    targetCategory: 'Registro Formal Académico (Logit > 0)',
    bias: -1.5,
    features: [
      { id: 'f1', label: 'Conectores lógicos avanzados ("Furthermore", "Consequently", "In contrast")', description: 'Marcadores de cohesión académica', inputValue: 1.0, weight: 2.7 },
      { id: 'f2', label: 'Léxico latino/formal ("implement", "demonstrate", "investigate")', description: 'Palabras de raíz latina de alto registro', inputValue: 1.0, weight: 2.4 },
      { id: 'f3', label: 'Uso de contracciones informales ("don\'t", "wanna", "gonna")', description: 'Desaconsejado en redacción académica (penalizador)', inputValue: 0.0, weight: -3.2 },
      { id: 'f4', label: 'Phrasal verbs cotidianos ("get along", "give up", "put off")', description: 'Más comunes en lenguaje coloquial que académico', inputValue: 0.0, weight: -1.8 },
    ],
    explanation: 'El ajuste fino (Fine-Tuning) modifica precisamente estos pesos para que el modelo aprenda qué estilo responder: si el usuario pide "Write an academic paper", la red activa los pesos de vocabulario formal y apaga los pesos de contracciones coloquiales.'
  }
];

// ==========================================
// 3. OPEN SOURCE VS OPEN WEIGHTS VS CLOSED LLMs
// ==========================================
export const MODEL_CATEGORIES_DATA: ModelCategoryComparison[] = [
  {
    category: 'closed',
    title: 'Modelos Propietarios / Cerrados ("Caja Negra")',
    badge: 'Comercial en la Nube',
    examples: ['OpenAI GPT-4o / o1 / o3', 'Anthropic Claude 3.5 Sonnet', 'Google Gemini 1.5/2.0 (vía API Nube)'],
    weightsAccess: 'Cero acceso. Los pesos matemáticos (matrices W) están ocultos en los centros de datos del proveedor.',
    codeAccess: 'Código de arquitectura y entrenamiento totalmente propietario y cerrado.',
    dataAccess: 'Dataset de entrenamiento secreto y no auditable por el público.',
    offlineCapable: false,
    privacyLevel: 'Media / Dependiente de contratos comerciales. Toda interacción y texto de los estudiantes se transmite por internet a servidores corporativos.',
    mepSuitability: 'Excelente para prototipos y docentes individuales con conexión estable; riesgoso para políticas institucionales de privacidad de datos y aulas sin internet.',
    costStructure: 'Pago por cada 1.000 tokens procesados (costo recurrente en dólares).',
    keyAdvantages: [
      'Máxima capacidad de razonamiento en modelos de frontera (Frontier models)',
      'Ventanas de contexto gigantescas (1 a 2 millones de tokens)',
      'No requiere hardware ni infraestructura propia (cero mantenimiento de GPU)'
    ],
    keyLimitations: [
      'Imposible de ejecutar en Unidades Regionales o teléfonos sin conexión a internet',
      'Riesgo de que el proveedor cambie o retire el modelo sin previo aviso',
      'Inviabilidad de auditar sesgos lingüísticos o adaptar internamente los pesos para el currículo del INA'
    ]
  },
  {
    category: 'open-weights',
    title: 'Modelos de Pesos Abiertos (Open Weights)',
    badge: 'Libertad de Ejecución & Soberanía',
    examples: ['Meta Llama 3.1 / 3.2 (1B a 70B)', 'Mistral AI (Mistral 7B, NeMo, Mixtral)', 'Alibaba Qwen 2.5', 'DeepSeek-V3 / DeepSeek-R1'],
    weightsAccess: 'Acceso Total a los Pesos. Se pueden descargar libremente los archivos de parámetros (.safetensors, .gguf, .pt) de varios gigabytes.',
    codeAccess: 'Código de inferencia y arquitectura abierto; el código del pipeline de entrenamiento pre-train puede estar parcialmente documentado.',
    dataAccess: 'La receta exacta de pre-entrenamiento suele resumirse en un paper técnico sin liberar cada documento del dataset original.',
    offlineCapable: true,
    privacyLevel: 'Máxima Privacidad (100% Local). Puede instalarse en un teléfono móvil, laptop o servidor del INA sin enviar un solo dato al exterior.',
    mepSuitability: 'La opción predilecta para soberanía tecnológica institucional, laboratorios de cómputo del INA y teléfonos de los 245 docentes.',
    costStructure: 'Costo cero de licencias o por token; solo el hardware donde se ejecute.',
    keyAdvantages: [
      '100% Funcional sin conexión a internet (ideal para las 9 Unidades Regionales de Costa Rica)',
      'Garantía total de privacidad: las interacciones y evaluaciones de estudiantes jamás salen del dispositivo',
      'Posibilidad de hacer Fine-Tuning específico (LoRA) con los programas del Subsector de Idiomas del INA'
    ],
    keyLimitations: [
      'Requiere que el dispositivo del usuario tenga suficiente memoria RAM/VRAM para cargar los pesos',
      'No siempre se conoce cada texto exacto con el que fue pre-entrenado el modelo base'
    ]
  },
  {
    category: 'fully-open',
    title: 'Modelos Totalmente Abiertos (Full Open Source & Open Science)',
    badge: 'Ciencia Abierta Completa',
    examples: ['AllenAI OLMo (Open Language Model)', 'EleutherAI Pythia', 'BigScience BLOOM', 'TII Falcon Open Data'],
    weightsAccess: 'Pesos 100% libres en cada punto de control (checkpoints de cada época de entrenamiento).',
    codeAccess: '100% Código Abierto (scripts de recolección de datos, tokenizadores, entrenamiento distribuido y evaluación).',
    dataAccess: 'Dataset de entrenamiento 100% público, inspeccionable y descargable (ej. Dolma 3T tokens).',
    offlineCapable: true,
    privacyLevel: 'Máxima Privacidad & Total Auditabilidad Científica.',
    mepSuitability: 'Ideal para investigación y transferencia tecnológica (INA, UNED, UCR, UNA, TEC) y auditoría lingüística exhaustiva de sesgos.',
    costStructure: 'Completamente gratuito bajo licencias Apache 2.0 o MIT.',
    keyAdvantages: [
      'Transparencia absoluta: un docente o lingüista puede verificar si una palabra o texto específico estaba en los datos de entrenamiento',
      'Reproducibilidad científica total',
      'Sin restricciones comerciales de ningún tipo'
    ],
    keyLimitations: [
      'Suelen tener menor presupuesto de cómputo que los gigantes comerciales, con rendimiento ligeramente inferior en razonamiento frontera',
      'Ecosistema de modelos más reducido'
    ]
  }
];

// ==========================================
// 4. SMALL LANGUAGE MODELS (SLMs) & MOBILE EDGE AI
// ==========================================
export const LIQUID_AI_ARCHITECTURE_POINTS: LiquidModelArchitecturePoint[] = [
  {
    title: 'Complejidad Computacional de la Atención',
    traditionalTransformer: 'Complejidad Cuadrática O(N²). Si el texto se duplica, el cálculo de atención y la memoria se multiplican por 4, saturando la memoria RAM en teléfonos.',
    liquidFoundationModel: 'Sistemas Dinámicos Continuos / Modelos de Espacio de Estados (SSMs) con complejidad lineal O(N) o memoria constante O(1).',
    whyItMattersForMobile: 'Permite leer libros enteros o mantener conversaciones prolongadas en un smartphone económico sin que se congele o gaste la batería.'
  },
  {
    title: 'Huella de Memoria (KV Cache)',
    traditionalTransformer: 'Requiere almacenar en RAM los vectores Key y Value de cada palabra previa (KV-Cache masivo que crece con cada mensaje).',
    liquidFoundationModel: 'Compresión de estado adaptativo continuo. El estado interno tiene un tamaño fijo independientemente de la longitud de la conversación.',
    whyItMattersForMobile: 'Un modelo LFM 1B o 3B puede correr en 1 a 2 GB de RAM compartida en un teléfono Android o iPhone estándar.'
  },
  {
    title: 'Adaptabilidad de Parámetros en Tiempo Real',
    traditionalTransformer: 'Los pesos W son estáticos y rígidos después del entrenamiento; solo la atención modula la activación.',
    liquidFoundationModel: 'Inspirado en neurobiología computacional (MIT CSAIL / Liquid AI): las ecuaciones diferenciales modelan cómo las conexiones se adaptan fluidamente a la dinámica del flujo de entrada.',
    whyItMattersForMobile: 'Mayor densidad de razonamiento por parámetro: un modelo pequeño rinde como un modelo 3 a 5 veces más grande en tareas lingüísticas.'
  }
];

export const DEVICE_COMPARISON_SCENARIOS: DeviceComparisonScenario[] = [
  {
    id: 'past-error',
    taskTitle: 'Corrección Inmediata de Error Gramatical en el Aula',
    userPrompt: 'Student writes: "Yesterday my brother go to the volcan Poas with his friends."',
    cefrLevel: 'A2 (Nivel Inicial / Técnico INA)',
    mobileModel: {
      name: 'Liquid LFM 1.3B / Llama-3.2-1B (Móvil Local - Cuantizado INT4)',
      architecture: 'Liquid State-Space / SLM On-Device',
      parameters: '1.3 Billones de Parámetros (4-bit)',
      ramUsageMB: 850,
      quantization: 'INT4 (Q4_K_M)',
      latencyMs: 35,
      privacy: '100% En el Teléfono (Sin Internet)',
      energyWatts: '1.2 W (Batería normal)',
      simulatedResponse: 'Corrección: "Yesterday my brother WENT to Poas Volcano with his friends."\n\nExplicación rápida para el estudiante:\n1. Como la acción ocurrió "yesterday" (tiempo pasado), debes usar el pasado irregular del verbo "go", que es "went".\n2. En inglés decimos "Poas Volcano" o "the Poas Volcano".',
      pedagogicalAssessment: 'Excelente para retroalimentación formativa inmediata en clase. El docente o alumno obtiene la corrección en milisegundos sin consumir datos del teléfono ni requerir internet en la escuela.'
    },
    cloudLabModel: {
      name: 'Frontier 405B Model (Servidor Central en Datacenter / Cloud)',
      architecture: 'Mega-Transformer Masivo (Cluster de 8 GPUs H100)',
      parameters: '405 Billones de Parámetros (FP16 / FP8)',
      ramUsageMB: 420000,
      quantization: 'FP16 (Precisión completa)',
      latencyMs: 780,
      privacy: 'Datos enviados a servidores en el extranjero',
      energyWatts: '5.600 W (Servidor industrial)',
      simulatedResponse: 'Análisis Lingüístico Exhaustivo:\n\n1. Concordancia temporal: "go" (base form) transgrede el marcador adverbial "yesterday". La forma correcta es el pretérito irregular "went" (/wɛnt/).\n2. Toponimia y artículos: En geografía anglosajona, los accidentes volcánicos anteponen el nombre propio o usan la estructura "the [Name] Volcano".\n3. Propuesta de andamiaje: Ejercicio de 3 oraciones de práctica con "went", "saw", "visited".',
      pedagogicalAssessment: 'Respuestas de profundidad enciclopédica, pero requiere conexión de fibra óptica permanente, pagar suscripción y no puede operar en aulas desconectadas.'
    }
  },
  {
    id: 'cloze-generator',
    taskTitle: 'Generador Rápido de Ejercicio Cloze (Biodiversidad de Costa Rica)',
    userPrompt: 'Generate a 4-sentence B1 fill-in-the-blank reading exercise about Costa Rican rainforests with a word bank.',
    cefrLevel: 'B1 (Intermedio / Técnico INA)',
    mobileModel: {
      name: 'Liquid LFM 3B / Phi-3.5 Mini (Móvil Local)',
      architecture: 'SLM Compacto Optimizado para NPU',
      parameters: '3.1 Billones de Parámetros (4-bit)',
      ramUsageMB: 1950,
      quantization: 'INT4',
      latencyMs: 65,
      privacy: '100% En el Teléfono (Sin Internet)',
      energyWatts: '1.8 W',
      simulatedResponse: 'Fill in the blanks using the words from the bank:\n[Word Bank: protected, biodiversity, tropical, species]\n\n1. Costa Rica is world-famous for its incredible ________.\n2. The country is covered with lush ________ rainforests that host thousands of animals.\n3. Many national parks ensure that wildlife remains ________ from deforestation.\n4. Biologists frequently discover new ________ of frogs and birds in Monteverde.\n\nAnswer Key: 1. biodiversity | 2. tropical | 3. protected | 4. species',
      pedagogicalAssessment: 'Genera material didáctico contextualizado en 3 segundos en el teléfono del docente, ideal durante la preparación de lecciones en el bus o en el aula rural.'
    },
    cloudLabModel: {
      name: 'Frontier 405B Model (Servidor Central en Datacenter)',
      architecture: 'Mega-Transformer Masivo (Cluster Datacenter)',
      parameters: '405 Billones de Parámetros (FP16)',
      ramUsageMB: 420000,
      quantization: 'FP16',
      latencyMs: 950,
      privacy: 'Datos enviados a servidores en la nube',
      energyWatts: '5.600 W',
      simulatedResponse: 'Costa Rican Biodiversity Reading Comprehension (CEFR B1 Matched):\n[Includes text, Word Bank, CEFR justification, Lexical Frequency profiling, and 3 follow-up discussion questions for paired conversation].',
      pedagogicalAssessment: 'Capacidad ilimitada para generar rúbricas completas de unidades bimestrales, pero con dependencia tecnológica externa total.'
    }
  },
  {
    id: 'collocation-explanation',
    taskTitle: 'Explicación de Colocación Léxica (Make vs Do)',
    userPrompt: 'Explain simply to an 8th grader why we say "make a decision" and not "do a decision".',
    cefrLevel: 'A2-B1',
    mobileModel: {
      name: 'Liquid LFM 1.3B / Llama-3.2-3B (Móvil Local)',
      architecture: 'SLM On-Device Móvil',
      parameters: '3.0 Billones de Parámetros (4-bit)',
      ramUsageMB: 1800,
      quantization: 'INT4',
      latencyMs: 40,
      privacy: '100% En el Teléfono (Sin Internet)',
      energyWatts: '1.5 W',
      simulatedResponse: '¡Hola! En inglés, las palabras "make" y "do" significan "hacer" en español, pero se usan en situaciones distintas:\n\n• Usamos MAKE cuando creamos algo nuevo o tomamos una elección: "make a decision", "make a cake", "make a mistake".\n• Usamos DO para tareas, deberes o rutinas: "do homework", "do exercise".\n\nRegla mnemotécnica: ¡Cuando eliges un camino, estás "creando" tu futuro, por eso dices "MAKE a decision"!',
      pedagogicalAssessment: 'Explicación clara, empática y pedagógicamente precisa para estudiantes costarricenses de secundaria.'
    },
    cloudLabModel: {
      name: 'Frontier 405B Model (Servidor Central en Datacenter)',
      architecture: 'Mega-Transformer Masivo',
      parameters: '405 Billones de Parámetros',
      ramUsageMB: 420000,
      quantization: 'FP16',
      latencyMs: 820,
      privacy: 'Datos en servidores extranjeros',
      energyWatts: '5.600 W',
      simulatedResponse: 'Etymological and Collocational Analysis of "Make" vs "Do" in Corpus Linguistics (BNC/COCA frequency distributions and historical split from Old English "macian" vs "dōn").',
      pedagogicalAssessment: 'Sobredimensionado para una duda rápida de aula, aunque valioso para un lingüista investigador.'
    }
  }
];
