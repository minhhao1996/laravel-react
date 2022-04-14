import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routers/router'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact="exact"
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default AppContent
