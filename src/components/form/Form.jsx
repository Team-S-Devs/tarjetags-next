const Form = ({ children, submit, formRef, change, onFocus }) => {
    return(
        <form onSubmit={submit} onFocus={onFocus} ref={formRef} onChange={change}>
            {children}
        </form>
    )
}

export default Form;