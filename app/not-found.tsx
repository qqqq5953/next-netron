'use client'

import Link from 'next/link'
import errorImage from '@/public/404.png'
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { useRouter } from 'next/navigation' // import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const router = useRouter()
  // const { t } = useTranslation('error')

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Image
        src={errorImage}
        alt="not found"
        className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3'
      />
      <p className="mt-4 text-lg">
        抱歉，您訪問的頁面不存在。
      </p>
      <div className='flex flex-col gap-2'>
        <Button
          size="lg"
          className='bg-blue-600 hover:bg-blue-500'
        >
          <Link href="/">回首頁</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.back()}
        >
          回上一頁
        </Button>
      </div>
    </div>
  );
}
