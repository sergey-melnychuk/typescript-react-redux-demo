import * as actions from './constants'
import { Employee } from '../typings'
import { PlanID, Amount } from './reducers'

export const fireEmployee = (employeeId: Employee['id'], planId: PlanID) => ({ 
    type: actions.FIRE_EMPLOYEE as typeof actions.FIRE_EMPLOYEE,
    employeeId, 
    planId 
})

export type FireEmployeeAction = ReturnType<typeof fireEmployee>

export const spareEmployee = (employeeId: Employee['id'], planId: PlanID, amount: Amount) => ({ 
    type: actions.SPARE_EMPLOYEE as typeof actions.SPARE_EMPLOYEE,
    employeeId, 
    planId, 
    amount 
})

export type SpareEmployeeAction = ReturnType<typeof spareEmployee>

export const createPlan = (planId: PlanID) => ({
    type: actions.CREATE_PLAN as typeof actions.CREATE_PLAN,
    planId,
})

export type CreatePlanAction = ReturnType<typeof createPlan>

export const selectPlan = (planId: PlanID) => ({
    type: actions.SELECT_PLAN as typeof actions.SELECT_PLAN,
    planId
})

export type SelectPlanAction = ReturnType<typeof selectPlan>

export type EmployeeAction = 
    | FireEmployeeAction
    | SpareEmployeeAction
    | CreatePlanAction
    | SelectPlanAction