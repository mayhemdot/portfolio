import { Link } from '@payloadcms/ui'
import { TextFieldDescriptionClientComponent } from 'payload'

const PaymentDescription: TextFieldDescriptionClientComponent = () => (
  <div
    style={{ fontStyle: 'normal', color: '#fff', padding: '8px 0px 0px 0px' }}
  >
    <Link href={process.env.NEXT_PUBLIC_YOOKASSA_PAYMENTS_URL} target="_blank">
      Check this link for payment status
    </Link>
  </div>
)

export default PaymentDescription
