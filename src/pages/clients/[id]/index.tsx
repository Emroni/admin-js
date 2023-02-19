import { Page } from '@/components';
import { ClientSummary } from '@/partials';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Client() {

    const [id, setId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            const newId = parseInt(router.query.id as string);
            setId(newId);
        }
    }, [
        router.query.id
    ]);

    return <Page title="Client">
        <ClientSummary id={id} />
    </Page>;

}