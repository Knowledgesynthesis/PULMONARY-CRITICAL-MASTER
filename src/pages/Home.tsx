import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Wind, Heart, Droplets, Bug, Activity, AlertCircle, Moon } from 'lucide-react'

const modules = [
  {
    id: 'asthma',
    title: 'Asthma Exacerbation',
    description: 'Pathophysiology, severity categories, peak flow zones, and stepwise management',
    icon: Wind,
    color: 'text-blue-500',
    path: '/asthma',
  },
  {
    id: 'copd',
    title: 'COPD Exacerbation',
    description: 'GOLD classification, triggers, bronchodilator therapy, and NIPPV initiation logic',
    icon: Heart,
    color: 'text-green-500',
    path: '/copd',
  },
  {
    id: 'pneumonia',
    title: 'Pneumonia',
    description: 'CAP vs HAP vs VAP differentiation, CURB-65, imaging patterns, and severity assessment',
    icon: Droplets,
    color: 'text-purple-500',
    path: '/pneumonia',
  },
  {
    id: 'tuberculosis',
    title: 'Tuberculosis',
    description: 'Latent vs active TB, screening tests, CXR patterns, and treatment regimens',
    icon: Bug,
    color: 'text-red-500',
    path: '/tuberculosis',
  },
  {
    id: 'pe',
    title: 'Pulmonary Embolism',
    description: 'Wells score, PERC rule, D-dimer strategy, and imaging selection (CTPA vs V/Q)',
    icon: Activity,
    color: 'text-orange-500',
    path: '/pulmonary-embolism',
  },
  {
    id: 'ards',
    title: 'ARDS',
    description: 'Berlin definition, CXR patterns, hypoxemia classification, and lung-protective ventilation',
    icon: AlertCircle,
    color: 'text-yellow-500',
    path: '/ards',
  },
  {
    id: 'osa',
    title: 'Obstructive Sleep Apnea',
    description: 'Risk factors, STOP-BANG overview, pathophysiology, and CPAP basics',
    icon: Moon,
    color: 'text-indigo-500',
    path: '/osa',
  },
]

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Pulmonary Critical Master
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master pulmonary emergencies and chronic disease management through interactive learning.
          Rapid stabilization, red-flag recognition, imaging pathways, and evidence-based treatment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Link key={module.id} to={module.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-muted ${module.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-12">
        <Link to="/cases">
          <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
            <CardHeader>
              <CardTitle>Clinical Cases</CardTitle>
              <CardDescription>
                Multi-step decision pathways and branching case scenarios
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/assessment">
          <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
            <CardHeader>
              <CardTitle>Assessment</CardTitle>
              <CardDescription>
                Test your knowledge with MCQs, imaging interpretation, and case vignettes
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/glossary">
          <Card className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
            <CardHeader>
              <CardTitle>Glossary</CardTitle>
              <CardDescription>
                Reference guide for pulmonary terms, scoring systems, and algorithms
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
