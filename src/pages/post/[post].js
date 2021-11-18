import View from '../../components/views/view'
import { useRouter } from 'next/router'

export default function Post() {
    const router = useRouter()
    const { post } = router.query

    return (
        <View name="Arjun" desc="Hello" add={ false } img="/assets/posts/link-45.svg" head="Post on LinkHub"/>
    )
}