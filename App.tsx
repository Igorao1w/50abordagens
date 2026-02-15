import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Smartphone, 
  Zap,
  Users,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const StickyCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
    <a 
      href="#offer" 
      className="block w-full bg-carnival-red text-white text-center font-black py-3 rounded-lg text-lg uppercase tracking-wide animate-pulse shadow-lg"
    >
      Quero Beijar Mais
    </a>
  </div>
);

const CTAButton = ({ text, className = "" }: { text: string; className?: string }) => (
  <a
    href="#offer"
    className={`block w-full max-w-md mx-auto bg-green-500 hover:bg-green-600 text-white text-center font-black text-lg md:text-xl py-4 rounded-xl shadow-[0_4px_0_0_#166534] active:shadow-none active:translate-y-1 transition-all uppercase ${className}`}
  >
    {text}
  </a>
);

const Section = ({ 
  children, 
  className = "", 
  dark = false 
}: { 
  children?: React.ReactNode; 
  className?: string; 
  dark?: boolean; 
}) => (
  <section className={`px-5 py-10 md:py-16 ${dark ? 'bg-carnival-dark text-white' : 'bg-white text-gray-900'} ${className}`}>
    <div className="max-w-lg mx-auto">
      {children}
    </div>
  </section>
);

const Headline = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <h2 className={`font-display text-3xl md:text-4xl uppercase leading-none mb-6 ${className}`}>
    {children}
  </h2>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) return prev;
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 text-carnival-red font-bold text-xl my-4 bg-red-50 p-2 rounded-lg border border-red-100">
      <Clock className="w-6 h-6" />
      <span>Oferta expira em: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const Carousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://i.postimg.cc/rsq6LPmt/Captura-de-tela-2026-02-10-161154.png",
    "https://i.postimg.cc/3whF95bZ/Captura-de-tela-2026-02-10-161134.png",
    "https://i.postimg.cc/d352VhqB/Captura-de-tela-2026-02-10-162422.png"
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto mb-10 group">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-xl items-start pb-4"
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 snap-center px-1">
             <img 
               src={img} 
               alt={`Feedback Real ${idx + 1}`} 
               className="w-full h-auto rounded-xl block shadow-lg border border-gray-200 bg-white"
             />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Desktop) */}
      <div 
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('left');
        }}
        className={`cursor-pointer hidden md:flex absolute top-1/2 -left-12 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-50 transition-opacity ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </div>
      <div 
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('right');
        }}
        className={`cursor-pointer hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-50 transition-opacity ${activeIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6" />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-0">
        {images.map((_, idx) => (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (scrollRef.current) {
                 scrollRef.current.scrollTo({
                   left: idx * scrollRef.current.clientWidth,
                   behavior: 'smooth'
                 });
              }
            }}
            className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? 'bg-carnival-red w-8' : 'bg-gray-300 w-2.5 hover:bg-gray-400'
            }`}
            aria-label={`Ir para imagem ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, text, stars = 5 }: { name: string; text: string; stars?: number }) => (
  <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
    <div className="flex text-carnival-orange mb-2">
      {[...Array(stars)].map((_, i) => (
        <Heart key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 italic text-sm mb-3">"{text}"</p>
    <p className="font-bold text-gray-900 text-xs uppercase tracking-wider">- {name}</p>
  </div>
);

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-start space-x-3 mb-3">
    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
    <span className="text-gray-700 font-medium leading-tight">{text}</span>
  </li>
);

const PainItem = ({ text }: { text: string }) => (
  <li className="flex items-start space-x-3 mb-3 text-left">
    <XCircle className="w-6 h-6 text-carnival-red shrink-0 mt-0.5" />
    <span className="text-gray-300 font-medium leading-tight">{text}</span>
  </li>
);

export default function App() {
  const [spotsLeft, setSpotsLeft] = useState(17);

  // Fake scarcity effect decrementing spots slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => prev > 4 ? prev - 1 : prev);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20 md:pb-0">
      
      {/* 1. Header / Hero Section */}
      <div className="bg-gradient-to-b from-carnival-red to-orange-600 text-white pt-12 pb-16 px-5 text-center relative overflow-hidden">
        {/* Confetti or texture placeholder */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-lg mx-auto relative z-10">
          <div className="inline-block bg-yellow-400 text-carnival-dark text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 animate-bounce">
            ⚠️ O Carnaval Chegou
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-4 drop-shadow-md">
            Você vai beijar muito neste carnaval
          </h1>
          
          <p className="text-lg md:text-xl font-medium text-orange-100 mb-8 leading-snug">
            Pare de voltar para casa sozinho. Tenha em mãos <span className="text-yellow-300 font-bold">50 abordagens prontas</span> e validadas para usar hoje mesmo.
          </p>

          <a href="#offer" className="block w-full bg-white text-carnival-red font-black text-xl py-4 rounded-xl shadow-[0_6px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-0.5 transition-all uppercase">
            QUERO BEIJAR NESTE CARNAVAL
          </a>
          
          <p className="mt-4 text-xs text-white/80 flex justify-center items-center gap-1">
            <Zap className="w-3 h-3" /> Acesso imediato no seu celular
          </p>
        </div>
      </div>

      {/* 2. Pain Section */}
      <Section dark className="text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-carnival-dark border-4 border-gray-800 p-3 rounded-full">
           <ArrowDown className="w-6 h-6 text-white" />
        </div>

        <Headline className="text-white">A Realidade da maioria...</Headline>
        <p className="text-gray-400 mb-8">
          O carnaval é a melhor época do ano, mas você continua passando pelas mesmas situações constrangedoras?
        </p>

        <ul className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
          <PainItem text="Vê mulheres lindas passando e trava na hora de falar." />
          <PainItem text="Usa aquela cantada velha e toma um fora na frente de todo mundo." />
          <PainItem text="Fica segurando o copo enquanto seus amigos beijam a noite toda." />
          <PainItem text="Volta para casa sozinho, frustrado e com a sensação de tempo perdido." />
        </ul>

        {/* 4. Pattern Break */}
        <div className="mt-10 mb-8 p-4 border-l-4 border-carnival-red bg-gray-800/50 text-left">
          <p className="text-xl font-bold text-white uppercase italic">
            Chega disso. Esse carnaval pode (e vai) ser diferente.
          </p>
        </div>

        <div className="w-full">
          <CTAButton text="NÃO QUERO VOLTAR PRA CASA SOZINHO" />
        </div>
      </Section>

      {/* 5. Solution & Benefits */}
      <Section className="bg-white">
        <div className="flex flex-col items-center">
           <img 
            src="https://i.postimg.cc/63JVTsC4/Gemini-Generated-Image-3fu9l33fu9l33fu9.png" 
            alt="Festa de Carnaval" 
            className="rounded-2xl shadow-lg mb-8 transition-transform duration-500 w-full object-cover h-64 sm:h-80"
           />
           
           <Headline className="text-carnival-red text-center">
             50 Abordagens Infalíveis
           </Headline>
           
           <p className="text-gray-600 text-center mb-8 leading-relaxed">
             Não é mágica, é preparação. Desenvolvemos um guia digital com <strong>50 frases e roteiros prontos</strong>, testados no campo de batalha dos blocos e festas. É só ler, copiar e usar.
           </p>

           <div className="w-full bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8">
             <h3 className="font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
               <Flame className="text-carnival-orange w-5 h-5" />
               O que você vai receber:
             </h3>
             <ul className="space-y-1">
               <BenefitItem text="Cantadas engraçadas que quebram o gelo instantaneamente." />
               <BenefitItem text="Elogios criativos que fogem do 'você é linda'." />
               <BenefitItem text="Abordagens contextuais para fila do banheiro, bar e multidão." />
               <BenefitItem text="Frases diretas para quem não quer perder tempo." />
               <BenefitItem text="Estratégia 'Anti-Vácuo' para recuperar a conversa." />
             </ul>
           </div>

           <CTAButton text="QUERO AS 50 ABORDAGENS AGORA" />
        </div>
      </Section>

      {/* 7. How it Works */}
      <Section className="bg-gray-100 border-t border-gray-200">
        <Headline className="text-center">Como Funciona?</Headline>
        <div className="grid gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="bg-carnival-red text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">1</div>
            <p className="font-medium text-gray-800">Baixe o material no seu celular agora.</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="bg-carnival-red text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">2</div>
            <p className="font-medium text-gray-800">No meio do bloco, abra o PDF discretamente.</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="bg-carnival-red text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">3</div>
            <p className="font-medium text-gray-800">Escolha a frase ideal para a situação e aja.</p>
          </div>
        </div>
      </Section>

      {/* 8. Social Proof */}
      <Section className="bg-white">
        <Headline className="text-center mb-8">Quem usou, aprovou</Headline>
        
        {/* Real Feedback Carousel */}
        <Carousel />

        <div className="grid gap-4 mb-8">
          <TestimonialCard 
            name="Marcos V., 24 anos" 
            text="Cara, eu sou tímido demais. Usei a abordagem número 12 na fila da bebida e fiquei com a menina na hora. Surreal."
          />
          <TestimonialCard 
            name="Felipe D., 29 anos" 
            text="Direto ao ponto. Sem enrolação. O valor é ridículo pelo resultado que traz. Salvei meu carnaval."
          />
          <TestimonialCard 
            name="Lucas S., 21 anos" 
            text="Estava duvidando, mas testei ontem no pré-carnaval. Resultado: 3 beijos na mesma noite. Aprovado!"
          />
        </div>

        <CTAButton text="SE FUNCIONOU PRA ELES, FUNCIONA PRA MIM" />
      </Section>

      {/* 9. Before and After */}
      <Section dark className="border-y border-gray-700">
         <Headline className="text-center text-white">A Diferença é Brutal</Headline>
         <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 opacity-70">
              <h4 className="text-red-400 font-bold uppercase mb-2 text-sm">Antes</h4>
              <ul className="text-sm space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-500" /> Travado</li>
                <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-500" /> Sem assunto</li>
                <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-500" /> Volta sozinho</li>
              </ul>
            </div>
            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/50 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 bg-green-500 text-white text-[10px] font-bold px-4 py-1 rotate-45">VOCÊ</div>
              <h4 className="text-green-400 font-bold uppercase mb-2 text-sm">Depois</h4>
              <ul className="text-sm space-y-2 text-white">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" /> Confiante</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" /> Sabe o que falar</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" /> Beijando muito</li>
              </ul>
            </div>
         </div>
      </Section>

      {/* 10. Offer & Scarcity */}
      <section id="offer" className="px-5 py-16 bg-white relative overflow-hidden">
        <div className="max-w-lg mx-auto bg-white border-2 border-carnival-red rounded-3xl p-6 shadow-2xl relative z-10 text-center">
           
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-carnival-red text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-md">
             Oferta Relâmpago
           </div>

           <h3 className="text-gray-500 font-medium mt-6 line-through text-lg">
             De R$ 47,00
           </h3>
           <div className="flex justify-center items-end gap-1 mb-2">
             <span className="text-gray-900 font-bold text-2xl mb-2">Por apenas</span>
             <span className="text-carnival-red font-display text-6xl md:text-7xl">17,00</span>
           </div>
           <p className="text-sm text-gray-500 mb-6">Pagamento único. Acesso vitalício.</p>

           <Countdown />
           
           <div className="bg-gray-100 rounded-lg p-3 mb-6 flex items-center justify-between border border-gray-200">
             <div className="flex items-center gap-2">
               <Users className="w-5 h-5 text-gray-600" />
               <span className="text-sm font-medium text-gray-700">Vagas com desconto:</span>
             </div>
             <span className="text-carnival-red font-bold text-lg">{spotsLeft} / 100</span>
           </div>

           {/* 12. Bonus */}
           <div className="text-left bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-8">
             <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-0.5 rounded uppercase">Bônus Grátis</span>
             <p className="font-bold text-gray-800 mt-2 text-sm leading-tight">
               🎁 Protocolo Assunto Infinito: Nunca mais deixe o silêncio constrangedor acontecer.
             </p>
           </div>

           {/* 13. CTA Button */}
           <a href="https://www.ggcheckout.com/checkout/v5/9iTPHd41yCaJ2VRUxIlE" className="block w-full bg-green-500 hover:bg-green-600 text-white font-black text-xl py-4 rounded-xl shadow-[0_4px_0_0_#166534] active:shadow-none active:translate-y-1 transition-all uppercase mb-4">
             Quero Beijar Mais Neste Carnaval
           </a>
           
           <div className="mt-6 flex flex-col items-start gap-3 max-w-sm mx-auto">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-left">Acesso imediato no celular</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-left">50 abordagens prontas para usar no Carnaval</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-left">Cantadas organizadas por situação</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-left">Bônus: Protocolo de Assunto Infinito</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-left">Garantia incondicional de 15 dias</span>
              </div>
           </div>
        </div>
      </section>

      {/* 11. Guarantee */}
      <Section className="bg-gray-50 text-center">
        <ShieldCheck className="w-16 h-16 text-gray-900 mx-auto mb-4" />
        <h3 className="text-xl font-bold uppercase mb-2">Garantia Blindada de 15 Dias</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Baixe o material, leia e teste. Se você achar que as abordagens não funcionam para você, nós devolvemos 100% do seu dinheiro. Sem perguntas. O risco é todo nosso.
        </p>
        
        <CTAButton text="GARANTIR MEU ACESSO AGORA" />
      </Section>

      {/* 14. Footer */}
      <footer className="bg-carnival-dark text-gray-500 py-10 px-5 text-center text-xs">
        <div className="max-w-lg mx-auto space-y-4">
          <p className="font-bold text-white uppercase tracking-widest mb-4">Carnaval Conquista &copy; {new Date().getFullYear()}</p>
          <div className="flex justify-center space-x-4 underline">
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
            <a href="#">Garantia</a>
          </div>
          <p className="opacity-50">
            Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho de uma estratégia não deve ser interpretada como uma garantia de resultados.
          </p>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}