import React, { useEffect, useState } from 'react';
import { User, get } from '../rest-api/users';

export type Props = {
    count: number
}

export const List = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // setup
        get(props.count).then(setUsers)

        return () => {
            // cleanup
        }
    }, [props.count])

    return <>
        <ol>{
            users.map((user) =>
                <li key={ user.login.uuid }>
                    <span>{`${user.name.title} ${user.name.first} ${user.name.last}`}</span>
                </li>
            )
        }</ol>
    </>
}
