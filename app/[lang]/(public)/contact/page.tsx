import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormContact from '../_components/FormContact';
import { useTranslation } from "@/app/i18n";
import { Language } from "@/lib/definitions";
import { fetchContact } from "@/lib/dataPublic";
import { isSuccessResponse } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: {
    lang: Language
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const result = await fetchContact(params.lang ?? "tw")

  return {
    title: isSuccessResponse(result) ?
      result.data.m_title : "",
    description: isSuccessResponse(result) ?
      result.data.m_description :
      "",
    keywords: isSuccessResponse(result) ?
      result.data.m_keywords :
      "",
  }
}

export default async function ContactPage(props: Props) {
  const { t } = await useTranslation(props.params.lang)
  const result = await fetchContact(props.params.lang)
  const placeholder = {
    "firstName": t("public.contact-page.placeholder.firstName"),
    "lastName": t("public.contact-page.placeholder.lastName"),
    "phone": t("public.contact-page.placeholder.phone"),
    "email": t("public.contact-page.placeholder.email"),
    "subject": t("public.contact-page.placeholder.subject"),
    "content": t("public.contact-page.placeholder.content")
  }

  return (
    <>
      <main className="flex flex-col gap-8">
        <p className="text-3xl font-semibold">{t("public.contact-page.title")}</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.825858253942!2d121.57602917613593!3d25.073890777790552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac7cf252bcb5%3A0xa586871f97e1cf27!2zMTE05Y-w5YyX5biC5YWn5rmW5Y2A55Ge5YWJ6LevMTY46JmfNUYtMg!5e0!3m2!1szh-TW!2stw!4v1724229152546!5m2!1szh-TW!2stw" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        <section className='sm:grid sm:grid-cols-2 sm:gap-8'>
          <div>
            <h3>{t("public.contact-page.form-title")}</h3>
            <FormContact placeholder={placeholder} />
          </div>
          {isSuccessResponse(result) && <div>
            <div>
              <h3>{t("public.contact-page.company-name")}</h3>
              <div>{result.data.description}</div>
            </div>
            <div>
              <h3>{t("public.contact-page.contact-info")}</h3>
              <ul className='not-prose'>
                <li>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-neutral-400' />{result.data.address}
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <FaPhone className='text-neutral-400' />{result.data.phone}
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-2'>
                    <MdEmail className='text-neutral-400' />{result.data.email}
                  </div>
                </li>
              </ul>
            </div>
          </div>}
        </section>
      </main>
    </>
  )
}