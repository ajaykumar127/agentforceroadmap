# Customer-Facing Release Notes Feature

## 🎉 New Option Added: Customer Facing - Release Notes

A third version option has been added to the roadmap application, providing direct access to official Salesforce release notes documentation.

---

## 📋 What It Does

The "Customer Facing - Release Notes" option displays a curated collection of official Salesforce Einstein and Agentforce release documentation with direct links to the Salesforce Help site.

### Included Releases:

1. **❄️ Winter '26** (Current Release)
   - Version: 258
   - Status: Current Release
   - Link: https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=258&type=5

2. **☀️ Summer '25** (Previous Release)
   - Version: 256
   - Status: Previous Release
   - Link: https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=256&type=5

3. **🌸 Spring '25** (Archived)
   - Version: 254
   - Status: Archived
   - Link: https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=254&type=5

4. **❄️ Winter '25** (Archived)
   - Version: 252
   - Status: Archived
   - Link: https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=252&type=5

---

## 🎯 Use Cases

### When to Use Customer Facing Version:
- ✅ **Customer Presentations**: Show official documentation to external stakeholders
- ✅ **Public Demos**: Display customer-accessible information
- ✅ **Training Sessions**: Reference official Salesforce documentation
- ✅ **Support Tickets**: Direct customers to official release notes
- ✅ **Sales Calls**: Show what's officially available and documented

### When to Use V1/V2:
- ✅ **Internal Planning**: Use V1/V2 for internal roadmap planning
- ✅ **Product Development**: Track features in development
- ✅ **Team Coordination**: Share detailed PM/engineering roadmaps
- ✅ **Executive Updates**: Present strategic product direction

---

## 🎨 Visual Design

### Release Cards
Each release is displayed as a beautiful card with:
- **Season/Year Header** (e.g., "❄️ Winter '26")
- **Status Badge**: Current Release, Previous Release, or Archived
- **Description**: Brief overview of the release content
- **Metadata**: Release date and version number
- **Action Button**: "View [Release] Release Notes →"

### Layout
- **Responsive Grid**: Cards adapt to screen size
- **Hover Effects**: Cards lift on hover for interactivity
- **Clean Typography**: Easy to read and scan
- **Consistent Branding**: Matches the Salesforce design language

---

## 💡 Key Features

### 1. **Clean Interface**
- No clutter from filters or search bars
- Focus entirely on release documentation
- Simple, intuitive navigation

### 2. **Direct Links**
- One-click access to official documentation
- Opens in new tab for easy reference
- No authentication required (public documentation)

### 3. **Status Indicators**
- **Current Release** (Green badge)
- **Previous Release** (Orange badge)
- **Archived** (Gray badge)

### 4. **Helpful Context**
- Each card includes release date and version
- Clear descriptions of what's included
- Tip section explaining how to switch versions

---

## 🔄 How It Works

### Version Switching
When "Customer Facing - Release Notes" is selected:
1. **Controls Bar Hides**: No need for timeline/grid/list views or filters
2. **Release Cards Display**: Shows the curated release note cards
3. **Version Info Updates**: Shows "Official Salesforce Documentation"

Switching back to V1 or V2:
1. **Controls Bar Restores**: Timeline/grid/list toggle and filters reappear
2. **Roadmap Data Loads**: Returns to internal roadmap view
3. **Last View Remembered**: Returns to the view you were using (timeline/grid/list)

---

## 📝 Technical Implementation

### Files Modified:
1. **index.html**
   - Added customer-facing option to version selector
   - Added new `customerView` section with release cards
   - Included 4 release note cards with links

2. **app.js**
   - Updated `switchVersion()` to handle customer-facing mode
   - Hides/shows controls bar based on version
   - Updates version info display

3. **styles.css**
   - Added `.customer-release-container` styles
   - Created `.release-card` styling
   - Added `.release-badge` variants (current, previous, archived)
   - Implemented hover effects and responsive design

### CSS Classes Added:
```css
.customer-release-container
.release-intro
.release-cards
.release-card
.release-header
.release-badge (current, previous, archived)
.release-description
.release-meta
.release-link
.release-footer
```

---

## 🔗 Release Note Links Format

All links follow this pattern:
```
https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=[VERSION]&type=5
```

Where `[VERSION]` is:
- 258 = Winter '26
- 256 = Summer '25
- 254 = Spring '25
- 252 = Winter '25

---

## 🎓 Adding More Releases

To add additional releases to the customer-facing view:

1. **Open `index.html`**
2. **Find the `release-cards` section**
3. **Add a new release card**:

```html
<div class="release-card">
    <div class="release-header">
        <h3>[Season Icon] [Season] '[Year]</h3>
        <span class="release-badge [status]">[Status]</span>
    </div>
    <p class="release-description">[Description]</p>
    <div class="release-meta">
        <span class="meta-item">📅 Release: [Full Date]</span>
        <span class="meta-item">🔖 Version: [Version Number]</span>
    </div>
    <a href="[Salesforce Help URL]" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="release-link">
        View [Season] '[Year] Release Notes →
    </a>
</div>
```

### Badge Status Options:
- `current` - Green (for latest release)
- `previous` - Orange (for recent past release)
- `archived` - Gray (for older releases)

---

## 🌟 Benefits

### For External Stakeholders:
✅ **Official Documentation**: Links to verified Salesforce content  
✅ **Always Current**: Release notes are maintained by Salesforce  
✅ **Professional Presentation**: Clean, trustworthy interface  
✅ **Easy Access**: One-click navigation to detailed docs  

### For Internal Teams:
✅ **Quick Reference**: Fast access to official documentation  
✅ **Customer Support**: Easy to share with customers  
✅ **Sales Enablement**: Show what's publicly available  
✅ **Version Clarity**: Clear distinction between internal and customer-facing  

---

## 📊 Version Comparison

| Feature | V1 | V2 | Customer Facing |
|---------|----|----|-----------------|
| **Purpose** | Core roadmap | Extended roadmap | Official documentation |
| **Audience** | Internal | Internal | External/Internal |
| **Item Count** | 17 | 40 | 4 releases |
| **Filters** | ✅ Yes | ✅ Yes | ❌ No |
| **Views** | 3 (Timeline/Grid/List) | 3 (Timeline/Grid/List) | 1 (Cards) |
| **Owners/PRDs** | ❌ No | ✅ Yes | N/A |
| **External Links** | ❌ No | Included | ✅ All links |

---

## 💬 User Guidance

The release notes view includes a helpful tip at the bottom:

> 💡 **Tip:** These links open official Salesforce documentation in a new tab. For internal roadmap planning, switch to V1 or V2 above.

This guides users on when to use each version.

---

## 🔮 Future Enhancements

Potential improvements for the customer-facing view:

1. **Dynamic Release Loading**: Auto-update with new Salesforce releases
2. **Search Within Releases**: Filter by feature type within release notes
3. **Release Comparison**: Side-by-side comparison of releases
4. **What's New Highlights**: Featured items from each release
5. **Release Timeline**: Visual timeline of all releases
6. **Download Options**: PDF downloads of release notes
7. **Notification System**: Alert when new releases are added

---

## ✅ Checklist for Use

Before sharing the customer-facing view:

- [x] Verify all release note links are accessible
- [x] Test links open in new tabs correctly
- [x] Ensure version selector is easy to find
- [x] Confirm responsive design on mobile
- [ ] Update release badges as new versions come out
- [ ] Add new releases as they're published by Salesforce
- [ ] Archive older releases as needed

---

## 📞 Quick Reference

**Access Customer-Facing View:**
1. Open the app at http://localhost:8000
2. Click the "Version" dropdown in the header
3. Select "Customer Facing - Release Notes"
4. Click any release button to view official docs

**Return to Roadmap:**
1. Click the "Version" dropdown
2. Select "V1 - Core Roadmap" or "V2 - Extended Roadmap"
3. Your previous view settings (timeline/grid/list) are restored

---

**Last Updated**: November 11, 2025  
**Version**: 2.2 (with Customer-Facing Release Notes)

---

## 📚 Related Resources

- [Salesforce Release Notes](https://help.salesforce.com/s/articleView?language=en_US&type=5&id=release-notes.salesforce_release_notes.htm)
- [Einstein & AI Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm)
- [Agentforce Documentation](https://www.salesforce.com/agentforce/)

