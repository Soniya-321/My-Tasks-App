import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from '../TagItem'

import './index.css'

class MyTasks extends Component {
  constructor(props) {
    super(props)
    const {tagsList} = this.props
    this.state = {
      inputText: '',
      selectOption: tagsList[0].optionId,
      itemsList: [],
      activeTag: '',
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {inputText, selectOption} = this.state
    const {tagsList} = this.props
    if (inputText.trim() === '') return

    const newTask = {
      id: uuidv4(),
      task: inputText,
      tag: selectOption,
    }

    this.setState(prevState => ({
      itemsList: [...prevState.itemsList, newTask],
      inputText: '',
      selectOption: tagsList[0].optionId,
    }))
  }

  onChangeTextInput = event => {
    this.setState({inputText: event.target.value})
  }
  onChangeSelectOption = event => {
    this.setState({selectOption: event.target.value})
  }

  setActiveTag = optionId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === optionId ? '' : optionId,
    }))
  }

  getFilteredTasks = () => {
    const {itemsList, activeTag} = this.state

    if (activeTag === '') {
      return itemsList
    }
    return itemsList.filter(eachTask => eachTask.tag === activeTag)
  }

  render() {
    const {inputText, selectOption, activeTag} = this.state
    const {tagsList} = this.props
    const filteredTasks = this.getFilteredTasks()

    return (
      <div className="app-container">
        <div className="left-container">
          <h1>Create a task!</h1>
          <form onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label htmlFor="task">Task</label>
              <input
                id="task"
                value={inputText}
                placeholder="Enter the task here"
                onChange={this.onChangeTextInput}
              />
            </div>
            <div className="input-container">
              <label htmlFor="tags">Tags</label>
              <select
                value={selectOption}
                id="tags"
                onChange={this.onChangeSelectOption}
              >
                {tagsList.map(each => (
                  <option
                    name={each.displayText}
                    value={each.optionId}
                    key={each.optionId}
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="right-container">
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <TagItem
                key={each.optionId}
                tagsList={each}
                isActive={activeTag === each.optionId}
                setActiveTag={this.setActiveTag}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {filteredTasks.length === 0 ? (
            <div>
              <p>No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-container">
              {filteredTasks.map(each => (
                <li className="li-item" key={each.id}>
                  <p>{each.task}</p>
                  <p className="tag-btn">{each.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
