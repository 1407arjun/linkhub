import View from '../../components/views/view'
import { useRouter } from 'next/router'

export default function Tag() {
    const router = useRouter()
    const { tag } = router.query

    return (
        <View name="Arjun" desc="Hello" add={ true } img="/assets/home/tag.svg" head="Tag on LinkHub"/>
    )
}