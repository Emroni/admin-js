import { getNestedValue } from '@/helpers/data';
import { capitalize, Link, Table, TableBody, TableCell, TableRow } from '@mui/material';
import NextLink from 'next/link';
import { Children, useEffect, useState } from 'react';
import Card from '../Card/Card';

export default function Summary({ children, entity }: SummaryProps) {

    const [fields, setFields] = useState<any[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Get fields
        const newFields: SummaryField[] = Children.map(children, child => child?.props)
            .filter((childProps: any) => childProps)
            .map((fieldProps: SummaryField) => ({
                label: capitalize(fieldProps.name),
                ...fieldProps,
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
                {fields.map((field, index) => {
                    // Get value
                    let value = field.children || (entity ? getNestedValue(entity, field.name) : null);

                    // Check link
                    if (field.getLink) {
                        const href = typeof field.getLink === 'function' ? field.getLink(entity) : field.getLink;
                        value = <Link component={NextLink} href={href}>
                            {value}
                        </Link>;
                    }

                    // Return row
                    return <TableRow key={index}>
                        <TableCell>
                            {field.label}
                        </TableCell>
                        <TableCell>
                            {value}
                        </TableCell>
                    </TableRow>;
                })}
            </TableBody>
        </Table>
    </Card>;

}

const SummaryField = (_: SummaryField) => null;
Summary.Field = SummaryField;