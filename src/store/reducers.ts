import { Employee } from '../typings'
import { EmployeeAction } from './actions'
import * as actions from './constants'

export type PlanID = string
export type Amount = number

export type Plan = {
    [employeeId in Employee['id']]: EmployeeAction
}

export type EmployeeState = {
    plans: {
        [key in PlanID]: Plan
    }, // definition of a type 'dict with key=string and value=plan
    selectedPlan?: PlanID
}

const initialState: EmployeeState = {
    plans: {}
}

// To use default parameter below, function call must look like reducer(undefined, <arg>)
// (undefined is resolved into initial parameter's value)
export const employeeReducer = 
    (state = initialState, action: EmployeeAction) => {
        switch (action.type) {
            case actions.FIRE_EMPLOYEE:
            case actions.SPARE_EMPLOYEE:
                // var next = {...state};
                // next.plans[action.planId][action.employeeId] = action;
                // return next;
                return {
                    ...state,
                    plans: {
                        ...state.plans,
                        [action.planId]: {
                            ...state.plans[action.planId],
                            [action.employeeId] : action
                        }
                    }
                }

            case actions.CREATE_PLAN:
                // var next = {...state};
                // next.plans[action.planId] = {};
                // return next;
                return {
                    ...state,
                    plans: {
                        ...state.plans,
                        [action.planId]: {}
                    }
                } 

            case actions.SELECT_PLAN: 
                // var next = {...state};
                // next.selectedPlan = action.planId;
                // return next;
                return {
                    ...state,
                    selectedPlan: action.planId
                }
                 
            default: // event is not supported by this reducer - just ignore
                return state
        }
    }
