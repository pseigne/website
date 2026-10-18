One of the main projects I worked on during my summer internship at Neon.ai is now live: Coder Cards.

When I was in high school, my computer science teacher told us that code is a lot like a writing style. Everyone has their own mix of vocabulary, structure, voice, and rhythm. Two programs can give the exact same output and still be written in completely different ways. That idea stuck with me. AI now writes a lot of developers' code, and it misses that nuance. The way an AI is taught to code will never match your style exactly.

This summer, [Roger Wiebe](https://www.linkedin.com/in/rjwiebe) showed our team a way to fix that: analyze someone's GitHub repositories to build a profile of their coding habits, then pair that profile with an AI coding agent so it writes code that sounds like them.

After playing with the demo, I wanted to know how my profile compared to everyone else's. That curiosity became the idea for a "Coder Identity Card": a snapshot of a developer's habits and public GitHub activity on one shareable card. I sketched the first design and used Cursor to build a working prototype. I borrowed the bento-grid layout you see on a lot of SaaS sites and kept iterating until version 0.2 felt ready to show the team.

![Hand-drawn phone wireframe sketch for Coder Cards from July 2026 with layout notes](/blog/wireframe-v0.1-sketch.webp)

![Coder Cards version 0.2 from August 13 arranged as a bento grid](/blog/v0.2-aug13.webp)

Everyone liked it, and our engineering team built the backend that does the analysis. Meanwhile I kept refining the front end: trying layouts, adjusting the color palette, and taking feedback. After weeks of iteration and PR reviews, we shipped a product I'm proud of.

The biggest thing I learned was what it takes to move a product from an idea to a public release with a small team: how to explain a design so someone else can build it, and how to keep cutting until each piece earns its place.

You can make your own card for free at [codercards.ai](https://codercards.ai/).
