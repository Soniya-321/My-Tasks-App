import './index.css'

const TagItem = props => {
  const {tagsList, isActive, setActiveTag} = props
  const {displayText, optionId} = tagsList
  const onTagClick = () => {
    setActiveTag(optionId)
  }
  const tagClassName = isActive ? 'active-tag' : 'tag-item'

  return (
    <li>
      <button className={tagClassName} onClick={onTagClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
