import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
    const { profile } = router.query

    return (
        <div></div>
    )
}