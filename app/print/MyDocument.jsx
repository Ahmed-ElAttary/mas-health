"use client";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Home from "@app/home/home";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export default function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <Home />
        </View>
      </Page>
    </Document>
  );
}
