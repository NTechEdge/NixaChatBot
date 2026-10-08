export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'pill'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface NavItem {
  id: string
  label: string
  iconName: string
  badge?: string
  href?: string
}

export interface UserProfile {
  name: string
  plan: string
  avatarUrl?: string
}
