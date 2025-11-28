import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Asthma',
    question: 'A 25-year-old with known asthma presents with peak flow 35% of predicted, speaking in words only, and using accessory muscles. What is the severity?',
    options: [
      'Mild exacerbation',
      'Moderate exacerbation',
      'Severe exacerbation',
      'Life-threatening exacerbation'
    ],
    correctAnswer: 2,
    explanation: 'Peak flow <40% with inability to speak in sentences and accessory muscle use indicates severe exacerbation requiring aggressive treatment.'
  },
  {
    id: 2,
    category: 'COPD',
    question: 'What is the appropriate oxygen saturation target in a COPD patient with chronic hypercapnia?',
    options: [
      'SpO₂ 95-100%',
      'SpO₂ 88-92%',
      'SpO₂ 85-88%',
      'No supplemental oxygen'
    ],
    correctAnswer: 1,
    explanation: 'Target SpO₂ 88-92% in COPD with chronic hypercapnia to avoid worsening CO₂ retention from suppressed hypoxic drive.'
  },
  {
    id: 3,
    category: 'COPD',
    question: 'Which finding suggests severe COPD exacerbation requiring possible NIPPV?',
    options: [
      'pH 7.38, PaCO₂ 42',
      'pH 7.28, PaCO₂ 68',
      'pH 7.45, PaCO₂ 35',
      'pH 7.35, PaCO₂ 40'
    ],
    correctAnswer: 1,
    explanation: 'pH <7.35 with elevated PaCO₂ indicates acute hypercapnic respiratory failure, which may benefit from NIPPV if patient can protect airway.'
  },
  {
    id: 4,
    category: 'Pneumonia',
    question: 'A patient develops pneumonia 72 hours after hospital admission. How is this classified?',
    options: [
      'Community-Acquired Pneumonia (CAP)',
      'Hospital-Acquired Pneumonia (HAP)',
      'Ventilator-Associated Pneumonia (VAP)',
      'Aspiration pneumonia'
    ],
    correctAnswer: 1,
    explanation: 'Pneumonia developing ≥48 hours after hospital admission (in non-ventilated patients) is classified as Hospital-Acquired Pneumonia (HAP).'
  },
  {
    id: 5,
    category: 'Pneumonia',
    question: 'CURB-65 score of 3 indicates what action?',
    options: [
      'Outpatient treatment',
      'Observation unit',
      'Hospital admission, consider ICU',
      'ICU admission required'
    ],
    correctAnswer: 2,
    explanation: 'CURB-65 ≥3 indicates high mortality risk (15-40%) and warrants hospital admission with consideration for ICU, especially if score ≥4.'
  },
  {
    id: 6,
    category: 'Tuberculosis',
    question: 'Which finding differentiates active TB from latent TB?',
    options: [
      'Positive PPD test alone',
      'Positive QuantiFERON test alone',
      'Cavitary lesions on chest X-ray with cough',
      'Exposure to TB patient'
    ],
    correctAnswer: 2,
    explanation: 'Active TB requires clinical symptoms (cough, fever) AND abnormal chest imaging. Positive test alone without symptoms/CXR findings = latent TB.'
  },
  {
    id: 7,
    category: 'Tuberculosis',
    question: 'A patient has positive QuantiFERON, no symptoms, and normal chest X-ray. What is the diagnosis?',
    options: [
      'Active pulmonary TB',
      'Latent TB infection (LTBI)',
      'Extrapulmonary TB',
      'False positive test'
    ],
    correctAnswer: 1,
    explanation: 'Positive TB test + no symptoms + normal CXR = Latent TB Infection (LTBI). Patient is not contagious but has infection requiring treatment to prevent activation.'
  },
  {
    id: 8,
    category: 'Pulmonary Embolism',
    question: 'A patient with Wells score of 7 (high probability) for PE should undergo:',
    options: [
      'D-dimer testing first',
      'PERC rule application',
      'Direct CTPA imaging',
      'Lower extremity ultrasound only'
    ],
    correctAnswer: 2,
    explanation: 'High Wells score (>6) should proceed directly to CTPA. D-dimer is often elevated in high-risk patients and would only delay diagnosis without adding value.'
  },
  {
    id: 9,
    category: 'Pulmonary Embolism',
    question: 'PERC rule is most appropriate in which scenario?',
    options: [
      'High clinical suspicion for PE',
      'Low clinical suspicion, to potentially rule out PE',
      'After positive D-dimer',
      'In all patients with chest pain'
    ],
    correctAnswer: 1,
    explanation: 'PERC rule is designed for LOW clinical suspicion cases. If all 8 PERC criteria are absent (PERC negative), PE can be ruled out without further testing.'
  },
  {
    id: 10,
    category: 'ARDS',
    question: 'A patient has bilateral infiltrates on CXR, PaO₂/FiO₂ ratio of 150, and symptoms started 3 days after aspiration. What is the ARDS severity?',
    options: [
      'Not ARDS',
      'Mild ARDS',
      'Moderate ARDS',
      'Severe ARDS'
    ],
    correctAnswer: 2,
    explanation: 'PaO₂/FiO₂ ratio 100-200 = Moderate ARDS. Berlin criteria met: timing <1 week, bilateral opacities, hypoxemia.'
  },
  {
    id: 11,
    category: 'ARDS',
    question: 'What is the target tidal volume in lung-protective ventilation for ARDS?',
    options: [
      '10-12 mL/kg predicted body weight',
      '8-10 mL/kg predicted body weight',
      '6 mL/kg predicted body weight',
      '4 mL/kg predicted body weight'
    ],
    correctAnswer: 2,
    explanation: 'Lung-protective ventilation targets 6 mL/kg predicted body weight to minimize volutrauma and ventilator-induced lung injury (VILI).'
  },
  {
    id: 12,
    category: 'ARDS',
    question: 'Prone positioning is indicated in ARDS when:',
    options: [
      'All ARDS patients',
      'Mild ARDS (PaO₂/FiO₂ 200-300)',
      'Severe ARDS (PaO₂/FiO₂ <150)',
      'Only after ECMO fails'
    ],
    correctAnswer: 2,
    explanation: 'Prone positioning shows mortality benefit in severe ARDS (PaO₂/FiO₂ <150) despite lung-protective ventilation. Start early for best results.'
  },
  {
    id: 13,
    category: 'OSA',
    question: 'A patient has STOP-BANG score of 6. What is the risk level?',
    options: [
      'Low risk',
      'Intermediate risk',
      'High risk',
      'No OSA'
    ],
    correctAnswer: 2,
    explanation: 'STOP-BANG ≥5 indicates high risk of moderate to severe OSA. Sleep study strongly recommended.'
  },
  {
    id: 14,
    category: 'OSA',
    question: 'What is the most common cardiovascular complication of untreated OSA?',
    options: [
      'Myocardial infarction',
      'Hypertension',
      'Atrial fibrillation',
      'Stroke'
    ],
    correctAnswer: 1,
    explanation: 'Hypertension is the most common cardiovascular complication of OSA, affecting up to 50% of patients with OSA. OSA contributes to resistant hypertension.'
  },
  {
    id: 15,
    category: 'General',
    question: 'Which condition is LEAST likely to benefit from NIPPV?',
    options: [
      'COPD with hypercapnic respiratory failure',
      'Cardiogenic pulmonary edema',
      'Severe asthma exacerbation',
      'Obesity hypoventilation syndrome'
    ],
    correctAnswer: 2,
    explanation: 'NIPPV is typically NOT indicated in severe asthma exacerbation and may be harmful. Asthma management focuses on bronchodilators, steroids, and oxygen. NIPPV is beneficial in COPD, CHF, and OHS.'
  }
]

export function Assessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowExplanation(true)
      setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]))
    }
  }

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnsweredQuestions(new Set())
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-4xl font-bold mb-4">Assessment</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge with multiple choice questions across all pulmonary topics
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
              {currentQuestion.category}
            </span>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-100 dark:bg-red-900/20'
                      : 'border-primary bg-primary/10'
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                    : 'border-border hover:border-primary/50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start">
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
                : 'bg-red-100 dark:bg-red-900/20 border-red-500'
            }`}>
              <p className="font-semibold mb-2">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="flex-1"
              >
                Submit Answer
              </Button>
            ) : (
              <>
                {currentQuestionIndex > 0 && (
                  <Button onClick={handlePreviousQuestion} variant="outline" className="flex-1">
                    Previous Question
                  </Button>
                )}
                {!isLastQuestion ? (
                  <Button onClick={handleNextQuestion} className="flex-1">
                    Next Question
                  </Button>
                ) : (
                  <Button onClick={handleReset} className="flex-1">
                    Restart Assessment
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Progress indicator */}
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{answeredQuestions.size} / {questions.length} answered</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(answeredQuestions.size / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About This Assessment</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            This assessment contains {questions.length} multiple choice questions covering all major pulmonary topics including asthma, COPD, pneumonia, TB, PE, ARDS, and OSA.
          </p>
          <p>
            Questions are designed to test clinical reasoning and application of concepts. Immediate feedback is provided after each answer with detailed explanations.
          </p>
          <p className="text-muted-foreground italic">
            Note: This is an educational tool. No scores are tracked or stored.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
