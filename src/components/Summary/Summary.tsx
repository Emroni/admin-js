import { capitalize, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';

export default function Summary({ children, entity }: SummaryProps) {

    const [fields, setFields] = useState<any[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Get fields
        const newFields: SummaryField[] = Children.map(children, child => ({
            label: capitalize(child.props.name),
            ...child.props,
        }));
        setFields(newFields);

        // Get title
        const newTitle = capitalize(entity?.name || '');
        setTitle(newTitle);
    }, [
        children,
        entity,
    ]);

    return <Card loading={!entity} title={title}>
        <Table>
            <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {field.label}
                        </TableCell>
                        <TableCell>
                            {field.children || entity?.[field.name]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Card>;

}

const SummaryField = (_: SummaryField) => null;
Summary.Field = SummaryField;