import View from '../../components/views/view'
import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
    const { profile } = router.query

    return (
        <View name="Arjun" desc="Hello" add={ false } img="/assets/profile/person.svg" head="Profile on LinkHub"/>
    )
}