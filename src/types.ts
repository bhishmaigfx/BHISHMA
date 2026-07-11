export type ActiveTab = 'home' | 'products' | 'studio' | 'calculator' | 'about' | 'contact';

export interface CardTemplate {
  id: string;
  name: string;
  category: 'corporate' | 'education' | 'visitor' | 'security';
  primaryColor: string;
  secondaryColor: string;
  layout: 'vertical' | 'horizontal';
  backgroundStyle: 'gradient' | 'waves' | 'solid' | 'modern';
}

export interface CardDesignData {
  fullName: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  avatarUrl: string;
  logoText: string;
  primaryColor: string;
  secondaryColor: string;
  templateId: string;
  layout: 'vertical' | 'horizontal';
  showBarcode: boolean;
  showChip: boolean;
  lanyardColor: string;
  customLanyardText: string;
}

export interface QuoteEstimation {
  cardMaterial: 'pvc_premium' | 'pvc_eco' | 'rfid_smart' | 'magnetic_stripe' | 'wooden_eco';
  printType: 'single_side' | 'double_side';
  quantity: number;
  includeLanyards: boolean;
  lanyardType: 'standard_plain' | 'custom_printed' | 'premium_satin';
  includeHolders: boolean;
  holderType: 'clear_vinyl' | 'rigid_plastic' | 'premium_yoyo';
  estimatedUnitPrice: number;
  estimatedTotal: number;
  deliveryDays: number;
}

export interface SavedInquiry {
  id: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  notes: string;
  status: 'pending' | 'reviewed' | 'dispatched';
  type: 'design_quote' | 'bulk_quote' | 'general_query';
  designData?: CardDesignData;
  quoteData?: QuoteEstimation;
}
