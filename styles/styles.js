import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#9AC9D8',
    secondary: '#333',
    background: '#fff',
    error: '#d89a9a',
    success: '#aad89a',
    text: '#333',
    border: '#eee',
    lightGray: '#F7F7F7',
    mediumGray: '#777',
    lightBlue: '#87CEEB',
    transparentPrimary: '#9AC9D854',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontFamily: 'Gayathri',
    marginVertical: theme.spacing.md,
    zIndex: 1,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.sm,
    fontFamily: 'FiraSans',
  },
  dayContainer: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs,
  },
  emptyDayContainer: {
    width: '14.28%',
    aspectRatio: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.lg,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.lg,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDayCircle: {
    backgroundColor: theme.colors.lightBlue,
  },
  dayText: {
    fontSize: theme.fontSize.lg,
  },
  emojiContainer: {
    backgroundColor: theme.colors.lightGray,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'FiraSans',
    fontWeight: 'regular',
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.sm,
  },
  emojis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emoji: {
    fontSize: theme.fontSize.xl,
  },
  habitTracker: {
    marginBottom: theme.spacing.lg,
  },
  habit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  dailyPhrase: {
    fontStyle: 'italic',
  },
  avatarButton: {
    position: 'absolute',
    right: theme.spacing.sm,
    top: theme.spacing.sm,
    zIndex: 10,
  },
  avatarContainer: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  label: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    fontFamily: 'Gayathri',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  mood: {
    fontSize: theme.fontSize.xxxl,
  },
  selectedMood: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
  },
  input: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.md,
  },
  inputArea: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.md,
    textAlignVertical: 'top',
    height: 150,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
  buttonRed: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  activityIcon: {
    margin: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitiesScrollContainer: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  activitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  selectedActivity: {
    color: theme.colors.primary,
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  progressBarWrapper: {
    flex: 1,
    height: 20,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: theme.spacing.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },
  progressText: {
    position: 'absolute',
    left: '45%',
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: theme.fontSize.sm,
  },
  medicationText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    width: 300,
  },
  modalTitle: {
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.lg,
  },
  timeInput: {
    height: 40,
    borderColor: theme.colors.border,
    borderWidth: 1,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconSelection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  icon: {
    margin: theme.spacing.sm,
  },
  dayButton: {
    backgroundColor: theme.colors.lightGray,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    margin: theme.spacing.xs,
  },
  calendarContainer: {
    width: '100%',
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  monthContainer: {
    flexDirection: 'column',
    marginRight: theme.spacing.xs,
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  dayBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
  },
  historialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  historialText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
  monthNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    width: '100%'
  },
  monthNavigationButton: {
    padding: theme.spacing.sm,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthNavigationText: {
    fontSize: theme.fontSize.md,
  },
  monthText: {
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
  },
  yearInPixelsContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.sm,
  },
  historialContainer: {
    marginTop: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  historialTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.mediumGray,
  },
  sortButton: {
    position: 'absolute',
    right: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
  },
  streakIconContainer: {
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTextContainer: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  streakCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  streakNextLevel: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  medicationStatus: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  noDataText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  moodIconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  activityIconContainer: {
    alignItems: 'center',
    position: 'relative',
    margin: 10,
  },
  countBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  monthlyStatsContainer: {
    marginTop: 20,
  },
  monthlyStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  activitiesStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  listItemCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.text,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  itemDate: {
    color: theme.colors.mediumGray,
    fontSize: 14,
    marginTop: 4,
  },
  itemDescription: {
    color: theme.colors.mediumGray,
    fontSize: 14,
    marginVertical: 4,
  },
  healthCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  healthCardContent: {
    flex: 1,
  },
  healthCardTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  healthCardIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  healthStatusText: {
    fontSize: 14,
    color: theme.colors.mediumGray,
    fontStyle: 'italic',
  },
  pendingStatus: {
    color: theme.colors.error,
  },
  medicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  medicationTime: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 2,
  },
  medicationLastTaken: {
    fontSize: 12,
    color: '#999999',
  },
  takenButton: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 16,
  },
  takenButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  takenButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  medicationList: {
    paddingVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 24,
  },
  historyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  historyLinkText: {
    color: theme.colors.primary,
    marginLeft: 4,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  historyHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  historyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 16,
    color: theme.colors.text,
  },
  historyTime: {
    fontSize: 14,
    color: theme.colors.mediumGray,
  },
  medicationHistoryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  medicationHistoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0,
  },
  historyItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItemText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  historyScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0,
  },
  historyCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'left',
  },
  historyCardDate: {
    fontSize: 14,
    color: theme.colors.mediumGray,
    marginTop: 4,
  },
  historyEmptyText: {
    fontSize: 16,
    color: theme.colors.mediumGray,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteHistoryButton: {
    backgroundColor: theme.colors.error,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  deleteHistoryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  medicationInactiveText: {
    color: theme.colors.error,
    fontSize: 16,
    fontStyle: 'italic',
  },
  activateButton: {
    backgroundColor: theme.colors.success,
  },
 modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    width: 40, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  iconButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  timeButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    marginBottom: 20,
  },
  timeButtonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  inputMed: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
