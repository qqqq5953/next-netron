import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormContact from '../_components/FormContact';

export default async function ContactPage() {
  return (
    <>
      <main className="flex flex-col gap-8">
        <p className="text-3xl font-semibold">聯絡我們</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.825858253942!2d121.57602917613593!3d25.073890777790552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac7cf252bcb5%3A0xa586871f97e1cf27!2zMTE05Y-w5YyX5biC5YWn5rmW5Y2A55Ge5YWJ6LevMTY46JmfNUYtMg!5e0!3m2!1szh-TW!2stw!4v1724229152546!5m2!1szh-TW!2stw" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        <section className='sm:grid sm:grid-cols-2 sm:gap-8'>
          <div>
            <h3>表單填寫</h3>
            <FormContact />
          </div>
          <div>
            <div>
              <h3>網創資訊股份有限公司</h3>
              <div>請留下您的資料，我們將會在收到訊息後立即與您聯繫！</div>
            </div>
            <div>
              <h3>聯繫方式</h3>
              <ul className='not-prose'>
                <li>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-neutral-400' />台北市內湖區瑞光路168號5F-2
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <FaPhone className='text-neutral-400' />+886-2-77181919
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <MdEmail className='text-neutral-400' />info@netron.net
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}