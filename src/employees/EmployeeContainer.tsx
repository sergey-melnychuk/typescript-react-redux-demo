import React, { useState, useEffect, CSSProperties } from "react";
import { Employee } from "../typings";
import client from "../rest-api/employees";
import { Loader } from '../shared/loader/Loader';
import Counter from '../shared/counter/Counter';
import { connect } from 'react-redux'
import { EmployeeState, Amount, Plan } from '../store/reducers';
import { EmployeeAction } from '../store/actions';
import * as actions from "../store/actions";
import * as constants from '../store/constants'

// Might be an option for assigning 'key' property
//export const hash = () => Math.random() + ''

// extends React.Component
// state = { employees: [] }
// componentDidMount: call getAll, then this.setState({ employees })
// componentWillUnmount: cleanup

export type EmployeeProps = {
    onFire?: (id: Employee['id']) => void,
    onRaise?: (id: Employee['id'], amount: Amount) => void
    plan?: Plan
}

// hook-based definition of the container
export const EmployeeContainer = (props: EmployeeProps) => {
    const [currentLimit, setCurrentLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)

    const [canDec, setCanDec] = useState(false)
    const [canInc, setCanInc] = useState(true)

    const inc = () => {
        setCurrentPage(currentPage + 1)
    }

    const dec = () => {
        setCurrentPage(currentPage - 1)
    }

    const selectLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentLimit(parseInt(event.target.value))
        setCurrentPage(1) // Go back to the first page
    }

    const [loading, setLoading] = useState(false)

    // [<getter>, <setter>] = useState(...)
    const [employees, setEmployees] = useState<Employee[] | undefined>(undefined)

    /*
    > ['10','10','10','10'].map(parseInt)
    [ 10, NaN, 2, 3 ]
    > ['10','10','10','10'].map((e, i, _) => parseInt(e, i))
    [ 10, NaN, 2, 3 ]
    */

    useEffect(() => {
        // init
        setLoading(true)
        client.getPage(currentPage, currentLimit)
            .then(es => {
                if (es.length === 0) {
                    setLoading(false)
                    setCurrentPage(currentPage - 1)
                    return
                }

                setEmployees(es)
                setCanInc(es.length === currentLimit)
                setCanDec(currentPage > 1)
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false)) // 'setLoading' triggers re-rendering

        return () => {
            // cleanup
            // usefule for WebSockets to avoid connections leak
            // HTTP connection must be closed, but Promise is not cancellable!
        }
    }, 
    [currentPage, currentLimit]
    ) // dependency list for a hook: empty == never restart (fires only once), missing = every change of state

    const raise = (id: Employee['id']) => {
        return () => {
            console.log('raising employee ID=' + id)
            props.onRaise && props.onRaise!(id, 100)
        }
    }

    const fire = (id: Employee['id']) => {
        return () => {
            console.log('firing employee ID=' + id)
            props.onFire && props.onFire!(id)
        }
    }

    const getColor = (id: Employee['id']) => {
        console.log('get-color: props = ' + JSON.stringify(props))
        if (!props.plan) {
            return 'black'
        }
        if (!props.plan![id]) {
            return 'black'
        }
        console.log('props.plan![id] = ' + JSON.stringify(props.plan![id])) 
        console.log(props.plan![id].type)
        switch (props.plan![id].type) {
            case constants.FIRE_EMPLOYEE:  
                return 'red'
            case constants.SPARE_EMPLOYEE: 
                return 'green'
            default: 
                return 'black'
        }
    }

    const getStyle = (id: Employee['id']) => {
        const color = getColor(id)
        const style: CSSProperties = {
            color
        }
        return style
    }

    // "<></>" stands for a fragment - just node in virtual DOM
    return <>
        <h1>Employees</h1>
        <Counter initial={42} />
        <div>
            <span>
                <select onChange={selectLimit} defaultValue={currentLimit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <button onClick={dec} disabled={!canDec || loading}>←</button>
                { currentPage }
                <button onClick={inc} disabled={!canInc || loading}>→</button>
            </span>
        </div>
        <div>
        {!loading && employees
            ? <ul>{ 
            employees.map(({ id, firstName, lastName, salary }) => 
                // "key" property is required - re-rendering optimisation
                <li key={ id }>
                    <span style={ getStyle(id) }><b>{ `${firstName} ${lastName}` }</b> earns { salary }</span>
                    <button onClick={ raise(id) }>^</button>
                    <button onClick={ fire(id) }>X</button>
                </li>
            )}
            </ul>
            : <Loader /> }
        </div>
    </>
}

const mapStateToProps = (state: EmployeeState, _props: EmployeeProps) => {
    console.log('map state to props: state=' + JSON.stringify(state))
    console.log('map state to props: plan=' + JSON.stringify(state.plans['plan?']))
    return {
        plan: state.plans['plan?']
    }
}

const mapDispatchToProps = (dispatch: (action: EmployeeAction) => void, props: EmployeeProps) => {
    console.log('map dispatch to props')
    return {
        ...props,
        onRaise: (id: Employee['id'], amt: Amount) => {
            console.log('dispatch - on raise')
            dispatch(actions.spareEmployee(id, 'plan?', amt))
        },
        onFire: (id: Employee['id']) => {
            console.log('dispatch - on fire')
            dispatch(actions.fireEmployee(id, 'plan?'))
        }
    }
}

export const EmployeeContainerConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeContainer)
