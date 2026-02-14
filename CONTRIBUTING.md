# Contributing to مطبخ النكهات

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features
1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

#### Setup
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/moroccan-recipes.git
cd moroccan-recipes

# Create a new branch
git checkout -b feature/your-feature-name
```

#### Guidelines
- **Code Style**:
  - Use consistent indentation (2 spaces)
  - Follow existing naming conventions
  - Add comments for complex logic
  - Keep functions focused and modular

- **RTL Support**: 
  - Ensure all new features work with Arabic RTL layout
  - Test with Arabic text
  - Use logical properties (margin-inline, padding-block) where possible

- **Responsive Design**:
  - Test on mobile, tablet, and desktop
  - Use relative units (rem, em, %)
  - Follow existing breakpoints

- **Accessibility**:
  - Use semantic HTML
  - Ensure keyboard navigation works
  - Provide alt text for images
  - Maintain color contrast ratios

#### Testing
Before submitting:
- [ ] Test in Chrome, Firefox, and Safari
- [ ] Test on mobile devices
- [ ] Verify RTL layout works correctly
- [ ] Check that favorites persist across sessions
- [ ] Ensure search and filters work properly
- [ ] Verify no console errors

#### Commit Messages
Use clear, descriptive commit messages:
```
feat: Add recipe rating system
fix: Correct search filter bug
docs: Update README with new features
style: Improve recipe card spacing
refactor: Optimize search algorithm
```

#### Pull Request Process
1. Update documentation if needed
2. Ensure all tests pass
3. Update README.md with details of changes
4. Create Pull Request with:
   - Clear title
   - Description of changes
   - Screenshots/GIFs for UI changes
   - Reference related issues

### Adding Recipes
To add new recipes:

1. Edit `recipes-ar.json`
2. Follow the existing JSON structure:
```json
{
  "id": 76,
  "page": 100,
  "title": "اسم الوصفة",
  "time": "45 دقيقة",
  "servings": "4 أشخاص",
  "cost": "80 درهم",
  "ingredients": ["المقادير..."],
  "instructions": ["الخطوات..."],
  "chef_tip": "نصيحة اختيارية",
  "presentation": "طريقة التقديم",
  "image": "placeholder.jpg"
}
```

### Translation
Help translate the interface:
- Interface text is currently in Arabic
- We welcome translations to other languages
- Create language files following `ar.json` structure

## Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

## Questions?

Feel free to:
- Open an issue for clarification
- Ask in pull request comments
- Contact maintainers

## Recognition

Contributors will be:
- Listed in project acknowledgments
- Credited in release notes
- Recognized in the community

Thank you for contributing! 🙏
