'use client';

import ChangePaymentButton from './ui/ChangePaymentButton';
import { usePlanStore } from '@/app/store/usePlanStore';
import CurrentPlanCard from './ui/CurrentPlanCard';
import { useRouter } from 'next/navigation';
import PaymentInfo from './ui/PaymentInfo';
import Header from '@/componentes/Header';
import PlanCard from './ui/PlanCard';


export default function MyPlan() {
  const router = useRouter();
  const { plan, hasSubscribed, cardInfo, setPlan } = usePlanStore();

  if (plan === 'business' && hasSubscribed) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="flex items-center gap-2">
          <Header />
        </div>

        <div className="px-6 py-4 overflow-auto flex-1 w-full max-w-xl mx-auto">
          <CurrentPlanCard />

          {cardInfo && (
            <>
              <PaymentInfo
                number={cardInfo.number}
                validity={cardInfo.validity}
                paymentDate={new Date().toISOString()}
              />
              <ChangePaymentButton />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      <div className="px-6 py-4 overflow-auto flex-1 w-full max-w-xl mx-auto">
        <PlanCard
          type="trial"
          active={plan === 'trial'}
          onClick={() => setPlan('trial')}
        />

        <PlanCard
          type="business"
          active={plan === 'business'}
          onClick={() => setPlan('business')}
          onSubscribe={() => router.push('/payment')}
        />
      </div>
    </div>
  );
}
