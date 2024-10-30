import { useEffect, useMemo, useRef, useState } from 'react'
import RecipientsBadge from './RecipientsBadge'
import { styled } from 'styled-components'

type RecipientsDisplayProps = {
  recipients: string[]
}

export default function RecipientsDisplay({
  recipients,
}: RecipientsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [visibleRecipients, setVisibleRecipients] = useState<string[]>([])
  const [trimmedCount, setTrimmedCount] = useState<number>(0)
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const hiddenRecipients = useMemo(() => {
    return recipients.slice(visibleRecipients.length).join(', ')
  }, [visibleRecipients, recipients])

  useEffect(() => {
    const checkWidth = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth

      const tempContainer = document.createElement('span')
      tempContainer.style.visibility = 'hidden'
      tempContainer.style.whiteSpace = 'nowrap'
      document.body.appendChild(tempContainer)

      let displayedRecipients: string[] = []
      let trimmed = 0

      for (let i = 0; i < recipients.length; i++) {
        tempContainer.textContent =
          displayedRecipients.length > 0
            ? `${displayedRecipients.join(', ')}, ${recipients[i]}`
            : recipients[i]
        const width = tempContainer.offsetWidth

        if (width <= containerWidth - 30) {
          displayedRecipients.push(recipients[i])
        } else {
          trimmed = recipients.length - i
          break
        }
      }

      document.body.removeChild(tempContainer)
      setVisibleRecipients(displayedRecipients)
      setTrimmedCount(trimmed)
    }

    checkWidth()

    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [recipients])

  return (
    <>
      <RecipientsDisplayContainer>
        <RecipientsContainer ref={containerRef}>
          {recipients.length === 1 ? (
            <CellContainer singleRecipient={true}>
              {recipients[0]}
            </CellContainer>
          ) : (
            <>
              {visibleRecipients.join(', ')}
              {recipients.length !== trimmedCount && (
                <CellContainer singleRecipient={false}>,...</CellContainer>
              )}
            </>
          )}
        </RecipientsContainer>
        {recipients.length !== 1 && trimmedCount > 0 && (
          <div
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <RecipientsBadge numTruncated={trimmedCount} />
          </div>
        )}
      </RecipientsDisplayContainer>
      {tooltipVisible && (
        <RecipientsTooltipContainer>
          {hiddenRecipients}
        </RecipientsTooltipContainer>
      )}
    </>
  )
}

const RecipientsDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RecipientsContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 35px);
`

const CellContainer = styled.span<{ singleRecipient: boolean }>`
  ${({ singleRecipient }) =>
    singleRecipient &&
    `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `}
`

const RecipientsTooltipContainer = styled.div`
  padding: 8px 16px;
  position: fixed;
  top: 8px;
  right: 8px;
  background-color: #666;
  color: #f0f0f0;
  border-radius: 24px;
  display: flex;
  align-items: center;
`



{
    "contact_email": "lilitpoghosyan94@gmail.com",
    "github_url": "https://gist.github.com/LilitGH14/faa996575cdfdf4616ac89a0417928d2",
    "solution_framework": "react"
}