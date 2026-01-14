'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  Grid,
  Badge,
  Flex,
  Link as ThemeLink
} from 'theme-ui'
import Icon from '@hackclub/icons'
import Navigation from '../components/Navigation'
import projectsData from '../../data/projects.json'

/* =======================
   TYPES
======================= */

type BaseProject = {
  title: string
  status: string
  description?: string
  tech?: string[]
  link?: string
  github?: string
  icon?: string
}

type ProjectGroup = {
  group: string
  icon: string
  projects: BaseProject[]
}

type ProjectItem = BaseProject | ProjectGroup

const items = projectsData as ProjectItem[]

/* =======================
   TYPE GUARD
======================= */

function isGroup(item: ProjectItem): item is ProjectGroup {
  return 'group' in item && 'projects' in item
}

/* =======================
   PAGE
======================= */

export default function Projects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green'
      case 'In Progress':
        return 'blue'
      case 'Completed':
        return 'purple'
      default:
        return 'muted'
    }
  }

  const renderProjectCard = (
    project: BaseProject,
    fallbackIcon?: string
  ) => (
    <Card
      key={project.title}
      variant="primary"
      sx={{ p: 4, display: 'flex', flexDirection: 'column' }}
    >
      {/* HEADER */}
      <Flex sx={{ alignItems: 'center', gap: 3, mb: 3 }}>
        {(project.icon || fallbackIcon) && (
          <Box sx={{ width: 40, height: 40 }}>
            <img
              src={project.icon || fallbackIcon}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        )}

        <Heading as="h3" sx={{ fontSize: 3 }}>
          {project.title}
        </Heading>

        <Badge
          sx={{
            ml: 'auto',
            bg: getStatusColor(project.status)
          }}
        >
          {project.status}
        </Badge>
      </Flex>

      {/* DESCRIPTION */}
      {project.description && (
        <Text sx={{ mb: 3, color: 'secondary' }}>
          {project.description}
        </Text>
      )}

      {/* TECH */}
      {project.tech && (
        <Flex sx={{ gap: 2, flexWrap: 'wrap', mb: 3 }}>
          {project.tech.map(t => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </Flex>
      )}

      {/* LINKS */}
      <Flex
        sx={{
          gap: 2,
          mt: 'auto',
          flexWrap: 'wrap'
        }}
      >
        {project.link && (
          <ThemeLink
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 2,
              border: '2px solid',
              borderColor: 'primary',
              borderRadius: 'default',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                bg: 'primary',
                color: 'background'
              }
            }}
          >
            View <Icon glyph="external" size={16} />
          </ThemeLink>
        )}

        {project.github && (
          <ThemeLink
            href={`https://github.com/${project.github}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 2,
              border: '2px solid',
              borderColor: 'primary',
              borderRadius: 'default',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                bg: 'primary',
                color: 'background'
              }
            }}
          >
            GitHub <Icon glyph="github" size={16} />
          </ThemeLink>
        )}
      </Flex>
    </Card>
  )

  return (
    <Box>
      <Navigation />

      <Container sx={{ py: 5 }}>
        <Heading
          as="h1"
          sx={{
            mb: 4,
            fontSize: [5],
            fontWeight: 'bold',
            letterSpacing: '-0.02em'
          }}
        >
          Projects
        </Heading>

        {items.map(item =>
          isGroup(item) ? (
            /* =======================
               GROUP
            ======================= */
            <Box key={item.group} sx={{ mb: 6 }}>
              <Flex sx={{ alignItems: 'center', gap: 3, mb: 4 }}>
                <Box sx={{ width: 48, height: 48 }}>
                  <img
                    src={item.icon}
                    alt={item.group}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                <Heading
                  as="h2"
                  sx={{
                    fontSize: [4],
                    fontWeight: 'bold'
                  }}
                >
                  {item.group}
                </Heading>

              </Flex>

              <Grid columns={[1, 2]} gap={4}>
                {item.projects.map(project =>
                  renderProjectCard(project, item.icon)
                )}
              </Grid>
            </Box>
          ) : (
            /* =======================
               SINGLE PROJECT
            ======================= */
            <Grid key={item.title} columns={[1, 2]} gap={4} sx={{ mb: 6 }}>
              {renderProjectCard(item)}
            </Grid>
          )
        )}
      </Container>
    </Box>
  )
}
