'use client'

import { useEffect, useState } from 'react'
import {
  ThemeUIProvider,
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
import theme from '@hackclub/theme'
import Navigation from '../components/Navigation'
import yaml from 'js-yaml'
import type { Theme } from 'theme-ui'

interface YSWSLink {
  name: string
  url: string
}

interface YSWSOpportunity {
  name: string
  description: string
  website: string
  slack?: string
  slackChannel?: string
  status: string
  deadline?: string
  detailedDescription?: string
  links?: YSWSLink[]
}

interface YSWSData {
  limitedTime?: YSWSOpportunity[]
  yearRound?: YSWSOpportunity[]
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<YSWSOpportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/hackclub/YSWS-Catalog/refs/heads/main/data.yml')
      .then(res => res.text())
      .then(text => {
        const data = yaml.load(text) as YSWSData
        const normalize = (s: string | undefined) => s ? s.trim().toLowerCase() : 'unknown'
        const all = [...(data.limitedTime || []), ...(data.yearRound || [])]
          .map(o => ({ ...o, status: normalize(o.status) }))
          .filter(o => o.status !== 'draft')
        setOpportunities(all)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching opportunities:', err)
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'ended':
        return 'muted'
      case 'upcoming':
        return 'blue'
      default:
        return 'orange'
    }
  }

  const getBadgeText = (opp: YSWSOpportunity) => {
    if (opp.deadline) {
      const deadline = new Date(opp.deadline)
      const now = new Date()
      if (deadline > now) {
        return `Deadline: ${deadline.toLocaleDateString()}`
      }
    }
    return opp.status.charAt(0).toUpperCase() + opp.status.slice(1)
  }

  const limited = opportunities.filter(o => o.deadline && o.status !== 'ended')
  const active = opportunities.filter(o => !o.deadline && o.status === 'active')
  const ended = opportunities.filter(o => o.status === 'ended')
  const upcoming = opportunities.filter(o => o.status === 'upcoming')

  return (
    <ThemeUIProvider theme={theme as Theme}>
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

              {limited.length > 0 && (
                <Box sx={{ mb: [5, 6] }}>
                  <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em' }}>
                    Limited Time
                  </Heading>
                  <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                    {limited.map((opp, idx) => (
                      <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%', opacity: opp.status === 'ended' ? 0.7 : 1 }}>
                        <Box sx={{ mb: 3 }}>
                          <Badge variant="pill" sx={{ bg: getStatusColor(opp.status), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                        </Box>
                        <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                        <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                        <Box sx={{ mt: 'auto' }}>
                          <Grid columns={1} gap={2}>
                            <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'primary' }}>→ Visit Website</ThemeLink>
                            {opp.slack && <ThemeLink href={opp.slack} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [0, 1], color: 'muted' }}>💬 {opp.slackChannel || 'Join Slack'}</ThemeLink>}
                          </Grid>
                        </Box>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              )}

              {active.length > 0 && (
                <Box sx={{ mb: [5, 6] }}>
                  <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em' }}>
                    Active
                  </Heading>
                  <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                    {active.map((opp, idx) => (
                      <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ mb: 3 }}>
                          <Badge variant="pill" sx={{ bg: getStatusColor(opp.status), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                        </Box>
                        <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                        <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                        <Box sx={{ mt: 'auto' }}>
                          <Grid columns={1} gap={2}>
                            <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'primary' }}>→ Visit Website</ThemeLink>
                            {opp.slack && <ThemeLink href={opp.slack} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [0, 1], color: 'muted' }}>💬 {opp.slackChannel || 'Join Slack'}</ThemeLink>}
                          </Grid>
                        </Box>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              )}

              {upcoming.length > 0 && (
                <Box sx={{ mb: [5, 6] }}>
                  <Heading variant="headline" sx={{ mb: [4, 5], fontSize: [4, 5], letterSpacing: '-0.01em' }}>
                    Upcoming
                  </Heading>
                  <Grid columns={[1, 2, 3]} gap={[3, 4]}>
                    {upcoming.map((opp, idx) => (
                      <Card key={idx} variant="primary" sx={{ p: [4, 4, 5], display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ mb: 3 }}>
                          <Badge variant="pill" sx={{ bg: getStatusColor(opp.status), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                        </Box>
                        <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                        <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                        <Box sx={{ mt: 'auto' }}>
                          <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'primary' }}>→ Visit Website</ThemeLink>
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
                          <Badge variant="pill" sx={{ bg: getStatusColor(opp.status), fontSize: [0, 1] }}>{getBadgeText(opp)}</Badge>
                        </Box>
                        <Heading as="h3" sx={{ fontSize: [3, 4], mb: 3 }}>{opp.name}</Heading>
                        <Text sx={{ mb: 4, fontSize: [1, 2], color: 'secondary', flex: 1 }}>{opp.description}</Text>
                        <Box sx={{ mt: 'auto' }}>
                          <ThemeLink href={opp.website} target="_blank" rel="noopener noreferrer" sx={{ fontSize: [1, 2], fontWeight: 'bold', color: 'muted' }}>→ View Archive</ThemeLink>
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
    </ThemeUIProvider>
  )
}
