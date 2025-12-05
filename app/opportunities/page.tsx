'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  Grid,
  Badge,
  Link as ThemeLink,
  Spinner
} from 'theme-ui'
import Icon from '@hackclub/icons'
import Navigation from '../components/Navigation'

interface YSWSOpportunity {
  name: string
  description: string
  website: string
  slack?: string
  slackChannel?: string
  deadline?: string
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<YSWSOpportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://ysws.hackclub.com/feed.xml')
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(text, 'text/xml')
        const items = xml.querySelectorAll('item')

        const parsed: YSWSOpportunity[] = Array.from(items).map(item => {
          const title = item.querySelector('title')?.textContent || ''
          const link = item.querySelector('link')?.textContent || ''
          const descriptionHtml = item.querySelector('description')?.textContent || ''

          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = descriptionHtml

          const firstP = tempDiv.querySelector('p')?.textContent || ''

          const deadlineP = Array.from(tempDiv.querySelectorAll('p'))
            .find(p => p.textContent?.includes('Deadline'))
          const deadlineText = deadlineP?.textContent?.replace('Deadline:', '').trim() || undefined

          const slackLink = tempDiv.querySelector('a[href*="slack.com"]')
          const slackHref = slackLink?.getAttribute('href') || undefined
          const slackChannel = slackLink?.textContent || undefined

          return {
            name: title,
            description: firstP,
            website: link,
            deadline: deadlineText,
            slack: slackHref,
            slackChannel: slackChannel
          }
        })

        setOpportunities(parsed)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching opportunities:', err)
        setLoading(false)
      })
  }, [])

  const parseDeadline = (deadlineStr?: string): Date | null => {
    if (!deadlineStr) return null
    try {
      return new Date(deadlineStr)
    } catch {
      return null
    }
  }

  const isDeadlinePassed = (deadlineStr?: string): boolean => {
    const deadline = parseDeadline(deadlineStr)
    if (!deadline) return false
    return deadline < new Date()
  }

  const getBadgeText = (opp: YSWSOpportunity) => {
    if (opp.deadline) {
      const deadline = parseDeadline(opp.deadline)
      if (deadline && deadline > new Date()) {
        return `Deadline: ${deadline.toLocaleDateString()}`
      }
      return 'Ended'
    }
    return 'Active'
  }

  const getStatusColor = (opp: YSWSOpportunity) => {
    if (opp.deadline) {
      return isDeadlinePassed(opp.deadline) ? 'muted' : 'orange'
    }
    return 'green'
  }

  const active = opportunities.filter(o => o.deadline && !isDeadlinePassed(o.deadline))
  const indefinite = opportunities.filter(o => !o.deadline)
  const ended = opportunities.filter(o => o.deadline && isDeadlinePassed(o.deadline))

  return (
    <Box sx={{ bg: 'background', minHeight: '100vh' }}>
      <Navigation />

      <Box sx={{ bg: 'sheet', py: [5, 6] }}>
        <Container sx={{ textAlign: 'center', maxWidth: 'copy' }}>
          <Heading variant="title" sx={{ color: 'red', fontSize: [5, 6, 7], letterSpacing: '-0.02em' }}>
            Opportunities
          </Heading>
          <Text variant="subtitle" sx={{ mt: 3, fontSize: [2, 3], lineHeight: 'subheading' }}>
            Hack Club programs and challenges to help you build and grow
          </Text>
        </Container>
      </Box>

      <Container sx={{ py: [5, 6, 7] }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Spinner />
            <Text sx={{ mt: 3, color: 'muted' }}>Loading opportunities...</Text>
          </Box>
        ) : (
          <Box>
            {active.length > 0 && (
              <Box sx={{ mb: [5, 6] }}>
                <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em' }}>
                  Limited Time
                </Heading>
                <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                  {active.map((opp, idx) => (
                    <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ mb: 3 }}>
                        <Badge variant="pill" sx={{ bg: getStatusColor(opp), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                      </Box>
                      <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                      <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                      <Box sx={{ mt: 'auto' }}>
                        <Grid columns={1} gap={2}>
                          <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'primary', display: 'inline-flex', alignItems: 'center', gap: 1 }}><Icon glyph="enter" size={24} /> Visit Website</ThemeLink>
                          {opp.slack && <ThemeLink href={opp.slack} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [0, 1], color: 'muted' }}>💬 {opp.slackChannel || 'Join Slack'}</ThemeLink>}
                        </Grid>
                      </Box>
                    </Card>
                  ))}
                </Grid>
              </Box>
            )}

            {indefinite.length > 0 && (
              <Box sx={{ mb: [5, 6] }}>
                <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em' }}>
                  Indefinite
                </Heading>
                <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                  {indefinite.map((opp, idx) => (
                    <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ mb: 3 }}>
                        <Badge variant="pill" sx={{ bg: getStatusColor(opp), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                      </Box>
                      <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                      <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                      <Box sx={{ mt: 'auto' }}>
                        <Grid columns={1} gap={2}>
                          <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'primary', display: 'inline-flex', alignItems: 'center', gap: 1 }}><Icon glyph="enter" size={24} /> Visit Website</ThemeLink>
                          {opp.slack && <ThemeLink href={opp.slack} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [0, 1], color: 'muted' }}>💬 {opp.slackChannel || 'Join Slack'}</ThemeLink>}
                        </Grid>
                      </Box>
                    </Card>
                  ))}
                </Grid>
              </Box>
            )}

            {ended.length > 0 && (
              <Box sx={{ mt: [5, 6] }}>
                <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em', color: 'muted' }}>Ended</Heading>
                <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                  {ended.map((opp, idx) => (
                    <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%', opacity: 0.6 }}>
                      <Box sx={{ mb: 3 }}>
                        <Badge variant="pill" sx={{ bg: getStatusColor(opp), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                      </Box>
                      <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                      <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                      <Box sx={{ mt: 'auto' }}>
                        <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'muted', display: 'inline-flex', alignItems: 'center', gap: 1 }}><Icon glyph="enter" size={24} /> View Archive</ThemeLink>
                      </Box>
                    </Card>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </Container>

      <Box sx={{ bg: 'sunken', py: [5, 6, 7] }}>
        <Container sx={{ textAlign: 'center', maxWidth: 'copy' }}>
          <Heading variant="headline" sx={{ fontSize: [4, 5] }}>Want to learn more?</Heading>
          <Text sx={{ mt: 3, fontSize: [2, 3], color: 'secondary' }}>
            Join the{' '}
            <ThemeLink href="https://hackclub.com/slack" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary', fontWeight: 'bold' }}>
              Hack Club Slack
            </ThemeLink>{' '}
            to stay updated on all opportunities!
          </Text>
        </Container>
      </Box>
    </Box>
  )
}
