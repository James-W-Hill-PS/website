'use client'

import { ThemeUIProvider, Box, Container, Heading, Text, Card, Grid, Badge, Link as ThemeLink } from 'theme-ui'
import theme from '@hackclub/theme'
import Navigation from '../components/Navigation'

export default function Resources() {
  const resources = [
    {
      category: 'Getting Started',
      color: 'red',
      items: [
        { name: 'Hack Club Workshops', url: 'https://workshops.hackclub.com', description: 'Free coding tutorials' },
        { name: 'freeCodeCamp', url: 'https://freecodecamp.org', description: 'Learn to code for free' },
        { name: 'The Odin Project', url: 'https://theodinproject.com', description: 'Full-stack curriculum' },
        { name: 'CS50', url: 'https://cs50.harvard.edu', description: 'Harvard\'s intro to CS' }
      ]
    },
    {
      category: 'Web Development',
      color: 'blue',
      items: [
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web technology reference' },
        { name: 'Next.js Docs', url: 'https://nextjs.org/docs', description: 'React framework' },
        { name: 'Tailwind CSS', url: 'https://tailwindcss.com', description: 'Utility-first CSS' },
        { name: 'Web.dev', url: 'https://web.dev', description: 'Modern web guidance' }
      ]
    },
    {
      category: 'Programming Languages',
      color: 'green',
      items: [
        { name: 'Python.org', url: 'https://python.org', description: 'Official Python docs' },
        { name: 'JavaScript.info', url: 'https://javascript.info', description: 'Modern JS tutorial' },
        { name: 'Rust Book', url: 'https://doc.rust-lang.org/book/', description: 'Learn Rust' },
        { name: 'Go by Example', url: 'https://gobyexample.com', description: 'Learn Go' }
      ]
    },
    {
      category: 'Tools & Platforms',
      color: 'orange',
      items: [
        { name: 'GitHub', url: 'https://github.com', description: 'Code hosting & collaboration' },
        { name: 'Replit', url: 'https://replit.com', description: 'Online IDE' },
        { name: 'Vercel', url: 'https://vercel.com', description: 'Deploy web apps' },
        { name: 'Hack Club Bank', url: 'https://hackclub.com/bank', description: 'Fiscal sponsorship' }
      ]
    },
    {
      category: 'Practice & Challenges',
      color: 'purple',
      items: [
        { name: 'LeetCode', url: 'https://leetcode.com', description: 'Coding challenges' },
        { name: 'CodeWars', url: 'https://codewars.com', description: 'Code kata' },
        { name: 'HackerRank', url: 'https://hackerrank.com', description: 'Practice & compete' },
        { name: 'Advent of Code', url: 'https://adventofcode.com', description: 'December challenges' }
      ]
    },
    {
      category: 'Design & Assets',
      color: 'cyan',
      items: [
        { name: 'Figma', url: 'https://figma.com', description: 'Design tool' },
        { name: 'Unsplash', url: 'https://unsplash.com', description: 'Free photos' },
        { name: 'Font Awesome', url: 'https://fontawesome.com', description: 'Icons' },
        { name: 'Coolors', url: 'https://coolors.co', description: 'Color palettes' }
      ]
    }
  ]

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
              Resources
            </Heading>
            <Text 
              variant="subtitle" 
              sx={{ 
                mt: 3,
                fontSize: [2, 3],
                lineHeight: 'subheading'
              }}
            >
              Curated tools and tutorials to help you learn and build
            </Text>
          </Container>
        </Box>

        <Container sx={{ py: [5, 6, 7] }}>
          <Grid columns={[1, 2]} gap={[3, 4, 5]}>
            {resources.map((section, idx) => (
              <Card 
                key={idx} 
                variant="primary"
                sx={{ 
                  p: [4, 4, 5],
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Badge variant="pill" sx={{ bg: section.color, mb: 4, fontSize: [0, 1] }}>
                  {section.category}
                </Badge>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 4 
                }}>
                  {section.items.map((item, i) => (
                    <Box key={i}>
                      <ThemeLink 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          fontSize: [2, 3], 
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          color: 'primary',
                          lineHeight: 'heading',
                          transition: 'color 0.2s ease',
                          '&:hover': {
                            color: 'red',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {item.name} →
                      </ThemeLink>
                      <Text sx={{ fontSize: [1, 1], color: 'muted', mt: 1, lineHeight: 'body' }}>
                        {item.description}
                      </Text>
                    </Box>
                  ))}
                </Box>
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
              Know a great resource?
            </Heading>
            <Text sx={{ mt: 3, fontSize: [2, 3], lineHeight: 'body', color: 'secondary' }}>
              Share it with the club! We're always adding new resources to help members learn.
            </Text>
          </Container>
        </Box>
      </Box>
    </ThemeUIProvider>
  )
}
