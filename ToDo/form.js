// user input - includes validation
function TodoForm({addTodo}){
  const [value,setValue] = React.useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}> 
    <div/>
      <input 
        type="text"
        className="input"
        value={value}
        placeholder="Add ToDo..."
        onChange={e => setValue(e.target.value)} 
        />
       
       <button> + </button>
      
    </form>
  )
}