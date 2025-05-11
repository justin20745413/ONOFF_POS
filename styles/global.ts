import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  p1: {
    padding: theme.spacing[1],
  },
  p2: {
    padding: theme.spacing[2],
  },
  p3: {
    padding: theme.spacing[3],
  },
  p4: {
    padding: theme.spacing[4],
  },
  p6: {
    padding: theme.spacing[6],
  },
  pb1: {
    paddingBottom: theme.spacing[1],
  },
  pb2: {
    paddingBottom: theme.spacing[2],
  },
  pb3: {
    paddingBottom: theme.spacing[3],
  },
  pb4: {
    paddingBottom: theme.spacing[4],
  },
  pt1: {
    paddingTop: theme.spacing[1],
  },
  pt2: {
    paddingTop: theme.spacing[2],
  },
  pt3: {
    paddingTop: theme.spacing[3],
  },
  pt4: {
    paddingTop: theme.spacing[4],
  },
  pl1: {
    paddingLeft: theme.spacing[1],
  },
  pl2: {
    paddingLeft: theme.spacing[2],
  },
  pl3: {
    paddingLeft: theme.spacing[3],
  },
  pl4: {
    paddingLeft: theme.spacing[4],
  },
  pr1: {
    paddingRight: theme.spacing[1],
  },
  pr2: {
    paddingRight: theme.spacing[2],
  },
  pr3: {
    paddingRight: theme.spacing[3],
  },
  pr4: {
    paddingRight: theme.spacing[4],
  },
  m1: {
    margin: theme.spacing[1],
  },
  m2: {
    margin: theme.spacing[2],
  },
  m3: {
    margin: theme.spacing[3],
  },
  m4: {
    margin: theme.spacing[4],
  },
  mb1: {
    marginBottom: theme.spacing[1],
  },
  mb2: {
    marginBottom: theme.spacing[2],
  },
  mb3: {
    marginBottom: theme.spacing[3],
  },
  mb4: {
    marginBottom: theme.spacing[4],
  },
  mt1: {
    marginTop: theme.spacing[1],
  },
  mt2: {
    marginTop: theme.spacing[2],
  },
  mt3: {
    marginTop: theme.spacing[3],
  },
  mt4: {
    marginTop: theme.spacing[4],
  },
  ml1: {
    marginLeft: theme.spacing[1],
  },
  ml2: {
    marginLeft: theme.spacing[2],
  },
  ml3: {
    marginLeft: theme.spacing[3],
  },
  ml4: {
    marginLeft: theme.spacing[4],
  },
  mr1: {
    marginRight: theme.spacing[1],
  },
  mr2: {
    marginRight: theme.spacing[2],
  },
  mr3: {
    marginRight: theme.spacing[3],
  },
  mr4: {
    marginRight: theme.spacing[4],
  },
  shadow: {
    ...theme.shadows.md,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    ...theme.shadows.md,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[5],
    ...theme.shadows.xl,
    minWidth: 300,
    maxWidth: '80%',
  },
  textHeading1: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size['4xl'],
    lineHeight: theme.typography.size['4xl'] * theme.typography.lineHeight.tight,
    color: theme.colors.gray[900],
  },
  textHeading2: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size['3xl'],
    lineHeight: theme.typography.size['3xl'] * theme.typography.lineHeight.tight,
    color: theme.colors.gray[900],
  },
  textHeading3: {
    fontFamily: theme.typography.fontFamily.subheading,
    fontSize: theme.typography.size['2xl'],
    lineHeight: theme.typography.size['2xl'] * theme.typography.lineHeight.tight,
    color: theme.colors.gray[900],
  },
  textHeading4: {
    fontFamily: theme.typography.fontFamily.subheading,
    fontSize: theme.typography.size.xl,
    lineHeight: theme.typography.size.xl * theme.typography.lineHeight.tight,
    color: theme.colors.gray[900],
  },
  textBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    lineHeight: theme.typography.size.base * theme.typography.lineHeight.normal,
    color: theme.colors.gray[700],
  },
  textBodyMedium: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    lineHeight: theme.typography.size.base * theme.typography.lineHeight.normal,
    color: theme.colors.gray[700],
  },
  textBodySemiBold: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    lineHeight: theme.typography.size.base * theme.typography.lineHeight.normal,
    color: theme.colors.gray[800],
  },
  textBodyBold: {
    fontFamily: theme.typography.fontFamily.bodyBold,
    fontSize: theme.typography.size.base,
    lineHeight: theme.typography.size.base * theme.typography.lineHeight.normal,
    color: theme.colors.gray[800],
  },
  textSmall: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    lineHeight: theme.typography.size.sm * theme.typography.lineHeight.normal,
    color: theme.colors.gray[600],
  },
  textXSmall: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.xs,
    lineHeight: theme.typography.size.xs * theme.typography.lineHeight.normal,
    color: theme.colors.gray[500],
  },
});