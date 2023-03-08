import { Form } from '@/components';
import { CURRENCIES } from '@/constants';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function ClientAdd() {

    const router = useRouter();

    const [mutate, mutation] = useMutation(gql`mutation($input: ClientFields) {
        clientCreate (input: $input) {
            address
            email
            id
            name
        }
    }`);

    async function handleSubmit(values: IndexedObject) {
        const result = await mutate({
            variables: {
                input: values,
            },
        });
        mutation.client.clearStore();
        router.push(`/clients/${result.data.clientCreate.id}`);
    }

    return <Form loading={!!mutation.data || mutation.loading} title="Add Client" onSubmit={handleSubmit}>
        <Form.Field name="name" required />
        <Form.Field name="email" />
        <Form.Field name="address" type="textarea" />
    </Form>;

}