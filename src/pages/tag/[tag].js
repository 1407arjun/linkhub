import { useRouter } from 'next/router'

export default function Tag() {
    const router = useRouter()
    const { tag } = router.query

    return (
        <div></div>
    )
}