import { RefObject } from 'react'
import { Link } from 'react-router-dom'

const EmptyPage = ({
  description,
  backTo,
  buttonText,
  fetchMoreEl,
}: {
  description: string
  backTo?: string
  buttonText?: string
  fetchMoreEl?: RefObject<HTMLDivElement>
}) => (
  <div className="contents empty-page">
    <div>
      <p className="empty-page__description">{description}</p>
      {backTo && (
        <Link to={backTo} className="empty-page__back-button">
          {buttonText}
        </Link>
      )}
    </div>
    <div className="fetch-more" ref={fetchMoreEl} />
  </div>
)

export default EmptyPage
