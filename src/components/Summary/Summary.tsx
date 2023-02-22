import { Edit } from '@mui/icons-material';
import { capitalize, Table, TableBody } from '@mui/material';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';
import Menu from '../Menu/Menu';
import SummaryField from '../SummaryField/SummaryField';

export default function Summary({ children, entity }: SummaryProps) {

    const [fields, setFields] = useState<SummaryFieldProps[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Get fields
        const newFields: SummaryFieldProps[] = Children.map(children, child => child?.props)
            .filter((childProps: any) => childProps);
        setFields(newFields);

        // Get title
        const newTitle = capitalize(entity?.name || '');
        setTitle(newTitle);
    }, [
        children,
        entity,
    ]);

    const action = <Menu>
        <Menu.Item icon={Edit} label="Edit" link={`/${entity?.__typename.toLowerCase()}s/${entity?.id}/edit`} />
    </Menu>;

    return <Card action={action} loading={!entity} title={title}>
        <Table>
            <TableBody>
                {fields.map((field, index) => (
                    <SummaryField entity={entity} key={index} {...field} />
                ))}
            </TableBody>
        </Table>
    </Card>;

}

const Field = (_: Omit<SummaryFieldProps, 'entity'>) => null;
Summary.Field = Field;