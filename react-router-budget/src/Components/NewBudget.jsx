import React, { useEffect, useRef } from 'react'

// React router dom imports
import { Form, useFetcher } from 'react-router-dom'

// Heroicon library imports
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'


const NewBudget = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef()
    useEffect (()=> {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create new budget</h2>
    <fetcher.Form method="Post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
            <label htmlFor="newBudget">Budget Name</label>
            <input type="text" name="newBudget" id="newBudget" placeholder="e.g. Groceries" required ref={focusRef} />
        </div>
        <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input type="number" name="newBudgetAmount" placeholder="e.g. $400" step="0.01" inputMode="decimal" required />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {
                isSubmitting ? <span>Submitting...</span> : (
                <>
                    <span>Add Budget</span>
                    <CurrencyDollarIcon width={20}/>
                </>)
            }
        </button>
    </fetcher.Form>

    </div>
  )
}

export default NewBudget