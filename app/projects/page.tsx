'use client'

import {
  ThemeUIProvider,
  Box,
  Container,
  Heading,
  Text,
  Card,
  Grid,
  Badge,
  Button,
  Flex,
  Link as ThemeLink
} from 'theme-ui'
import theme from '@hackclub/theme'
import Navigation from '../components/Navigation'
import projectsData from '../../data/projects.json'

export default function Projects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green'
      case 'In Progress':
        return 'blue'
      case 'Completed':
        return 'purple'
      case 'Planning':
        return 'orange'
      default:
        return 'muted'
    }
  }

  return (
    <ThemeUIProvider theme={theme as any}>
      <Box sx={{ bg: 'background', minHeight: '100vh' }}>
        <Navigation />

        <Box sx={{ bg: 'sheet', py: [5, 6] }}>
          <Container sx={{ textAlign: 'center', maxWidth: 'copy' }}>
            <Heading
              variant="title"
              sx={{
                color: 'red',
                fontSize: [5, 6, 7],
                letterSpacing: '-0.02em'
              }}
            >
              Club Projects
            </Heading>
            <Text
              variant="subtitle"
              sx={{
                mt: 3,
                fontSize: [2, 3],
                lineHeight: 'subheading'
              }}
            >
              Check out what we're building together
            </Text>
          </Container>
        </Box>

        <Container sx={{ py: [5, 6, 7] }}>
          <Grid columns={[1, 2]} gap={[3, 4, 5]}>
            {projectsData.map((project, idx) => (
              <Card
                key={idx}
                variant="primary"
                sx={{
                  p: [4, 4, 5],
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <Flex
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    mb: 3,
                    gap: 2
                  }}
                >
                  <Flex sx={{ alignItems: 'center', gap: 3 }}>
                    <Box
                      sx={{
                        width: [40, 48],
                        height: [40, 48],
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src={project.icon}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    <Heading
                      as="h3"
                      sx={{ fontSize: [3, 4], lineHeight: 'heading' }}
                    >
                      {project.title}
                    </Heading>
                  </Flex>
                  <Badge
                    variant="pill"
                    sx={{
                      bg: getStatusColor(project.status),
                      flexShrink: 0,
                      fontSize: [0, 1]
                    }}
                  >
                    {project.status}
                  </Badge>
                </Flex>

                {project.description && (
                  <Text
                    sx={{
                      mb: 4,
                      fontSize: [1, 2],
                      lineHeight: 'body',
                      color: 'secondary',
                      flex: 1
                    }}
                  >
                    {project.description}
                  </Text>
                )}

                {project.tech && (
                  <Box sx={{ mb: 4 }}>
                    <Text
                      sx={{
                        fontSize: 1,
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'muted'
                      }}
                    >
                      Tech Stack:
                    </Text>
                    <Flex sx={{ gap: 2, flexWrap: 'wrap' }}>
                      {project.tech.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          sx={{ fontSize: [0, 1] }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                )}

                {(project.link || project.github) && (
                  <Flex sx={{ gap: 2, mt: 'auto', flexWrap: 'wrap' }}>
                    {project.link && (
                      <ThemeLink
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: [1, 2],
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          px: 3,
                          py: 2,
                          bg: 'transparent',
                          color: 'primary',
                          border: '2px solid',
                          borderColor: 'primary',
                          borderRadius: 'default',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bg: 'primary',
                            color: 'background'
                          }
                        }}
                      >
                        View Project →
                      </ThemeLink>
                    )}
                    {project.github && (
                      <ThemeLink
                        href={`https://github.com/${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: [1, 2],
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          px: 3,
                          py: 2,
                          bg: 'transparent',
                          color: 'primary',
                          border: '2px solid',
                          borderColor: 'primary',
                          borderRadius: 'default',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bg: 'primary',
                            color: 'background'
                          }
                        }}
                      >
                        GitHub →
                      </ThemeLink>
                    )}
                  </Flex>
                )}
              </Card>
            ))}
          </Grid>
        </Container>

        <Box sx={{ bg: 'sunken', py: [5, 6, 7] }}>
          <Container sx={{ textAlign: 'center', maxWidth: 'copy' }}>
            <Heading
              variant="headline"
              sx={{
                fontSize: [4, 5],
                letterSpacing: '-0.01em'
              }}
            >
              Have a project idea?
            </Heading>
            <Text
              sx={{
                mt: 3,
                mb: 4,
                fontSize: [2, 3],
                lineHeight: 'body',
                color: 'secondary'
              }}
            >
              We're always looking for new projects to work on together.
            </Text>
            <br />
            <Button variant="cta" sx={{ px: [3, 4], py: [2, 3] }}>
              Submit Project Idea
            </Button>
          </Container>
        </Box>
      </Box>
    </ThemeUIProvider>
  )
}
