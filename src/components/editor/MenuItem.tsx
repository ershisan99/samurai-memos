import { FC } from 'react'

type Props = {
    icon?: string
    title?: string
    action?: () => boolean
    isActive?: () => boolean
}

export const MenuItem: FC<Props> = ({
    icon,
    title,
    action,
    isActive = null,
}) => (
    <button
        className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
        onClick={action}
        title={title}
    >
        <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="fill-base-content"
        >
            <use href={`/remixicon.symbol.svg#ri-${icon}`} />
        </svg>
    </button>
)
