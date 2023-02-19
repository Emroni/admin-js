import { Page } from '@/components';
import { ProjectSummary } from '@/partials';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Project() {

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

    return <Page title="Project">
        <ProjectSummary id={id} />
    </Page>;

}